package it.corso.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.corso.dao.CategoriaDao;

@Service
public class CategoriaServiceImpl implements CategoriaService {

	@Autowired
	CategoriaDao categoriaDao;
}
