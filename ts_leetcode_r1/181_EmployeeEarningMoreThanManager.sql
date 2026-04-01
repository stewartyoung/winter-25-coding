WITH CTE_Earnings AS (
    SELECT e1.name AS Employee, e1.salary, e2.salary AS managerSalary
    FROM Employee AS e1 
    INNER JOIN Employee AS e2
    ON e1.managerId = e2.id
)
SELECT Employee FROM CTE_Earnings
WHERE salary > managerSalary;