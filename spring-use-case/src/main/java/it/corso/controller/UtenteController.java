package it.corso.controller;

import java.security.Key;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import it.corso.dto.UtenteDto;
import it.corso.dto.UtenteDtoAggiornamento;
import it.corso.dto.UtenteLoginRequestDto;
import it.corso.dto.UtenteLoginResponseDto;
import it.corso.dto.UtenteRegistrazioneDto;
import it.corso.jwt.JWTTokenNeeded;
import it.corso.jwt.Secured;
import it.corso.model.Ruolo;
import it.corso.model.Utente;
import it.corso.service.Blacklist;
import it.corso.service.UtenteService;
import jakarta.validation.Valid;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.core.HttpHeaders;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status;

@Path("/utente")
public class UtenteController {
	@Autowired
	private UtenteService utenteService;

	@Autowired
	private Blacklist blackList;

	@POST
	@Path("/registrazione")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response registraUtente(@Valid @RequestBody UtenteRegistrazioneDto utenteDto) {
		try {
			if (!Pattern.matches("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,20}",
					utenteDto.getPassword())) {
				return Response.status(Status.BAD_REQUEST).build();
			}
			if (utenteService.esisteUtenteMail(utenteDto.getEmail())) {
				return Response.status(Status.BAD_REQUEST).build();
			}

			utenteService.registraUtente(utenteDto);
			return Response.status(Status.OK).entity(utenteDto).build();
		} catch (Exception e) {
			return Response.status(Status.BAD_REQUEST).build();
		}
	}

	@GET
	@Path("/trova")
	@Produces(MediaType.APPLICATION_JSON)
	public Response trovaUtente(@QueryParam("email") String email) {
		try {
			if (email != null && !email.isEmpty()) {
				UtenteDto utente = utenteService.trovaUtenteDtoMail(email);
				return Response.status(Status.OK).entity(utente).build();
			}
			return Response.status(Status.BAD_REQUEST).build();
		} catch (Exception e) {
			return Response.status(Status.BAD_REQUEST).build();
		}
	}

	//@Secured(role = "Admin") // solo gli admin possono accedere
	//@JWTTokenNeeded
	@DELETE
	@Path("/cancella/{email}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response cancellaUtente(@PathParam("email") String email) {
		try {
			utenteService.cancellaUtente(email);
			return Response.status(Status.OK).build();
		} catch (Exception e) {
			return Response.status(Status.BAD_REQUEST).build();
		}
	}

	@PUT
	@Path("/aggiorna")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response aggiornaUtente(@RequestBody UtenteDtoAggiornamento utente) {
		try {
			utenteService.aggiornaUtente(utente);
			return Response.status(Status.OK).build();
		} catch (Exception e) {
			return Response.status(Status.BAD_REQUEST).build();
		}
	}

	
	@Secured(role = "Admin") // solo gli admin possono accedere
	@JWTTokenNeeded
	@GET
	@Path("/trova/tutti")
	@Produces(MediaType.APPLICATION_JSON)
	public Response trovaUtenti() {
		try {
			List<UtenteDto> utenti = utenteService.trovaUtenti();
			return Response.status(Status.OK).entity(utenti).build();
		} catch (Exception e) {
			return Response.status(Status.BAD_REQUEST).build();
		}
	}

	@POST
	@Path("/login")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response loginUtente(@RequestBody UtenteLoginRequestDto utente) {
		try {
			if (utenteService.loginUtente(utente)) {
				return Response.status(Status.OK).entity(issueToken(utente.getEmail())).build();
			}
			return Response.status(Status.BAD_REQUEST).build();
		} catch (Exception e) {
			return Response.status(Status.BAD_REQUEST).build();
		}
	}

	private UtenteLoginResponseDto issueToken(String email) {
		// eseguiamo una cifratura attraverso l'altgoritmo di cifratura HMAC
		byte[] secretKey = "enzomaccoeeelkkklwkekwkkrelkm232123213".getBytes();
		// crittografia
		Key key = Keys.hmacShaKeyFor(secretKey);
		Utente informazioniUtente = utenteService.trovaUtenteMail(email);
		Map<String, Object> map = new HashMap<>();
		map.put("nome", informazioniUtente.getNome());
		map.put("cognome", informazioniUtente.getCognome());
		map.put("email", informazioniUtente.getEmail());
		List<String> ruoli = new ArrayList<>();
		for (Ruolo ruolo : informazioniUtente.getRuoli()) {
			ruoli.add(ruolo.getTipologia().name());
		}
		map.put("ruoli", ruoli);

		Date creation = new Date();
		Date end = java.sql.Timestamp.valueOf(LocalDateTime.now().plusMinutes(15L));
		String jwtToken = Jwts.builder().setClaims(map).setIssuer("http://localhost:8080").setIssuedAt(creation)
				.setExpiration(end).signWith(key).compact();
		UtenteLoginResponseDto token = new UtenteLoginResponseDto();
		token.setToken(jwtToken);
		token.setTtl(end);
		token.setTokenCreationTime(creation);
		return token;
	}

	@GET
	@Path("/logout")
	public Response logoutUtente(ContainerRequestContext containerRequestContext) {
		// si potrebbe utilizzare Redis per salvare le sessioni
		try {
			String authorizazionHeader = containerRequestContext.getHeaderString(HttpHeaders.AUTHORIZATION);
			String token = authorizazionHeader.substring("Bearer".length()).trim();

			blackList.invalidateToken(token);
			return Response.status(Response.Status.OK).build();
		} catch (Exception e) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
		}

	}
}
