package it.corso.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.corso.dao.RuoloDao;

@Service
public class RuoloServiceImpl implements RuoloService {
	
	@Autowired
	RuoloDao ruoloDao;
}
