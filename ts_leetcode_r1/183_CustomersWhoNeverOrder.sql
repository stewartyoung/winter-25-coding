WITH CTE_Ordering AS (
    SELECT name, customerId FROM Customers AS C
    LEFT JOIN Orders AS O
    ON C.id = O.customerId
)
SELECT name AS Customers
FROM CTE_Ordering 
WHERE customerId IS NULL;