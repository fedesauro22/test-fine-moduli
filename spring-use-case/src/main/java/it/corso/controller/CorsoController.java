package it.corso.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;

import it.corso.dto.CorsoDto;
import it.corso.jwt.JWTTokenNeeded;
import it.corso.jwt.Secured;
import it.corso.service.CorsoService;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status;

@Path("/corso")
public class CorsoController {

	@Autowired
	private CorsoService corsoService;

	@GET
	@Path("/corsi")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCourses() {

		try {
			List<CorsoDto> listaCorsi = corsoService.getCourses();
			return Response.status(Response.Status.OK).entity(listaCorsi).build();

		} catch (Exception e) {

			return Response.status(Response.Status.BAD_REQUEST).entity("Errore caricamento utenti").build();
		}
	}

	@Secured(role = "Admin") // solo gli admin possono accedere
	@JWTTokenNeeded
	@DELETE
	@Path("/cancella/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response deleteCourse(@PathParam("id") int id) {
		try {
			corsoService.deleteCourse(id);
			return Response.status(Status.OK).build();
		} catch (Exception e) {
			return Response.status(Status.BAD_REQUEST).build();
		}
	}
	
	@Secured(role = "Admin")	
	@JWTTokenNeeded
	@PUT
	@Path("/aggiorna")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response updateCourse(@RequestBody CorsoDto corsoDto) {
		try {
			corsoService.updateCourse(corsoDto);
			return Response.status(Status.OK).build();
		} catch (Exception e) {
			return Response.status(Status.BAD_REQUEST).build();
		}
	}
}
