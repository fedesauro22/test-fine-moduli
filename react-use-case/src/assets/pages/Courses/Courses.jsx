import { useEffect, useState } from "react";
import { CourseCard } from "../../components/CourseCard/CourseCard";
import { getAllCourses } from "../../services/config/RESTService";

export function Courses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        //senza ogni tanto restituisce errore di destroy
        const fetchData = async () => {
            const coursesData = await getAllCourses();
            setCourses(coursesData);
        };
        fetchData();
    }, []);
    return (
        <div className="container">
            <h1 className="text-center">Lista dei corsi:</h1>
            <div className="row">
                {courses.map((course, index) => (
                    <div key={index} className="col-lg-4 col-md-6 mv-4">
                        <CourseCard Id={course.id} Titolo={course.nomeCorso} Descrizione={course.descrizioneBreve} Durata={course.durata} Categoria={course.idCategoria} />
                    </div>
                ))}
            </div>
        </div>
    );
}
