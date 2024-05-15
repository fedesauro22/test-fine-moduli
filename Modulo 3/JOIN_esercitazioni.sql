-- Federico Mollica 15/04/2024

-- Seleziona dei dati degli impiegati dei dipartimenti di Londra
SELECT e.first_name, e.last_name, e.JOB_ID, e.DEPARTMENT_ID, e.employee_id, d.department_name
FROM departments d
JOIN employees e ON d.DEPARTMENT_ID = e.DEPARTMENT_ID
JOIN locations l ON d.LOCATION_ID = l.LOCATION_ID
WHERE l.CITY = 'London';

-- Seleziona gli impiegati e rispettivi manager
SELECT e.employee_id, e.last_name, e.first_name, m.manager_id, m.last_name
FROM employees e
JOIN employees m ON e.MANAGER_ID = m.EMPLOYEE_ID; -- SELF JOIN

-- Seleziona dei dai dei manager di dipartimento con piu' di 15 anni di servizio
SELECT m.first_name, m.last_name, m.hire_date, m.salary
FROM departments d
JOIN employees m ON d.MANAGER_ID = m.EMPLOYEE_ID
WHERE TIMESTAMPDIFF(YEAR, m.hire_date, CURDATE()) > 15;

-- Seleziona delle informazioni riguardo la locazione di tutti i dipartimenti
SELECT l.location_id, l.street_address, l.city, l.state_province, c.country_name
FROM locations l
JOIN countries c ON l.country_id = c.country_id;

-- Seleziona lo storico dei dipendenti con salario superiore a 10.000
SELECT jh.*
FROM job_history jh
JOIN employees e ON jh.EMPLOYEE_ID = e.EMPLOYEE_ID
WHERE e.SALARY > 10000;