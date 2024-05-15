package it.corso.service;

import java.util.List;

import it.corso.dto.UtenteDto;
import it.corso.dto.UtenteDtoAggiornamento;
import it.corso.dto.UtenteLoginRequestDto;
import it.corso.dto.UtenteRegistrazioneDto;
import it.corso.model.Utente;

public interface UtenteService {
	void registraUtente(UtenteRegistrazioneDto utente);
	boolean esisteUtenteMail(String email);
	Utente trovaUtenteMail(String email);
	UtenteDto trovaUtenteDtoMail(String email);
	void cancellaUtente(String email);
	void aggiornaUtente(UtenteDtoAggiornamento utente);
	List<UtenteDto> trovaUtenti();
	boolean loginUtente(UtenteLoginRequestDto utenteLoginRequestDto);
}
