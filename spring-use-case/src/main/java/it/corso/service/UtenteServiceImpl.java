package it.corso.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.commons.codec.digest.DigestUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.corso.dao.RuoloDao;
import it.corso.dao.UtenteDao;
import it.corso.dto.UtenteDto;
import it.corso.dto.UtenteDtoAggiornamento;
import it.corso.dto.UtenteLoginRequestDto;
import it.corso.dto.UtenteRegistrazioneDto;
import it.corso.model.Ruolo;
import it.corso.model.Utente;

@Service
public class UtenteServiceImpl implements UtenteService {
	private ModelMapper modelMapper = new ModelMapper();
	
	@Autowired
	private UtenteDao utenteDao;
	
	@Autowired
	private RuoloDao ruoloDao;

	@Override
	public void registraUtente(UtenteRegistrazioneDto utente) {
		String password = DigestUtils.sha256Hex(utente.getPassword());
		utente.setPassword(password);
		Utente u = new Utente();
		u.setNome(utente.getNome());
		u.setCognome(utente.getCognome());
		u.setEmail(utente.getEmail());
		u.setPassword(password);
		
		utenteDao.save(u);
	}
	
	@Override
	public boolean esisteUtenteMail(String email) {
		return utenteDao.existsByEmail(email);
	}

	@Override
	public UtenteDto trovaUtenteDtoMail(String email) {
		//modelMapper.map
		Utente utente = utenteDao.findByEmail(email);

		UtenteDto utenteDto = modelMapper.map(utente, UtenteDto.class);

		return utenteDto;
	}

	@Override
	public void cancellaUtente(String email) {
		utenteDao.delete(utenteDao.findByEmail(email));
	}

	@Override
	public void aggiornaUtente(UtenteDtoAggiornamento utenteDto) {
		
		try {
			Utente utente = utenteDao.findByEmail(utenteDto.getEmail());
			if(utente != null) {
				utente.setNome(utenteDto.getNome());
				utente.setCognome(utenteDto.getCognome());
				utente.setEmail(utenteDto.getEmail());
				
				List<Ruolo> ruoli = new ArrayList<>();
				Optional<Ruolo> ruoloOpt = ruoloDao.findById(utenteDto.getRuoloId());
				
				if(ruoloOpt.isPresent()) {
					Ruolo ruolo = ruoloOpt.get();
					ruolo.setId(utenteDto.getRuoloId());
					
					ruoli.add(ruolo);
					utente.setRuoli(ruoli);
				}
				
				utenteDao.save(utente);
				
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public Utente trovaUtenteMail(String email) {
		return utenteDao.findByEmail(email);
	}

	@Override
	public List<UtenteDto> trovaUtenti() {
		List<Utente> utenti = (List<Utente>) utenteDao.findAll();
		List<UtenteDto> listaDto = new ArrayList<>();
		utenti.forEach(u-> listaDto.add(modelMapper.map(u, UtenteDto.class)));
		/*
		for(Utente utente : utenti) {
			UtenteDto temp = modelMapper.map(utente, UtenteDto.class);
			listaDto.add(temp);
		}*/
		return listaDto;
	}

	@Override
	public boolean loginUtente(UtenteLoginRequestDto utenteLoginRequestDto) {
		Utente utente = new Utente();
		utente.setEmail(utenteLoginRequestDto.getEmail());
		utente.setPassword(utenteLoginRequestDto.getPassword());
		String passwordHash = DigestUtils.sha256Hex(utente.getPassword());
		
		Utente credenzialiUtente = utenteDao.findByEmailAndPassword(utente.getEmail(), passwordHash);
		return credenzialiUtente != null ? true : false;
	}


	
}
