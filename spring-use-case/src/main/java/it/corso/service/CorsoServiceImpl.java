package it.corso.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.corso.dao.CorsoDao;
import it.corso.dto.CorsoDto;
import it.corso.model.Corso;

@Service
public class CorsoServiceImpl implements CorsoService {
	private ModelMapper modelMapper = new ModelMapper();

	@Autowired
	private CorsoDao corsoDao;

	@Override
	public List<CorsoDto> getCourses() {
		List<Corso> corso = (List<Corso>) corsoDao.findAll();
		List<CorsoDto> corsoDto = new ArrayList<>();
		corso.forEach(c -> corsoDto.add(modelMapper.map(c, CorsoDto.class)));

		return corsoDto;
	}

	@Override
	public void deleteCourse(int id) {
		corsoDao.deleteById(id);
	}

	@Override
	public void updateCourse(CorsoDto corsoDto) {
		Optional<Corso> corso = corsoDao.findById(corsoDto.getId());
		if(corso.isPresent()) {
			Corso c = new Corso();
			c.setNomeCorso(corsoDto.getNomeCorso());
			c.setDescrizioneBreve(corsoDto.getDescrizioneBreve());
			c.setDurata(corsoDto.getDurata());
			corsoDao.save(c);
		}
		
	}
}
