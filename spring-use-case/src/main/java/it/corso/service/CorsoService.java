package it.corso.service;

import java.util.List;

import it.corso.dto.CorsoDto;

public interface CorsoService {
	public List<CorsoDto> getCourses();
	public void deleteCourse(int id);
	public void updateCourse(CorsoDto corsoDto);
}
