package it.corso.controller;

import org.springframework.beans.factory.annotation.Autowired;

import it.corso.service.CategoriaService;
import jakarta.ws.rs.Path;

@Path("/categoria")
public class CategoriaController {

	@Autowired
	private CategoriaService categoriaService;
	
}
