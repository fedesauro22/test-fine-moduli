package it.corso.controller;

import org.springframework.beans.factory.annotation.Autowired;

import it.corso.service.RuoloService;
import jakarta.ws.rs.Path;

@Path("/ruolo")
public class RuoloController {

	@Autowired
	private RuoloService ruoloService;
}
