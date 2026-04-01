WITH CTE_Shifted AS (
    SELECT w.id, w.recordDate, w.temperature, w2.temperature AS temparatureYday
    FROM weather AS w
    INNER JOIN weather AS w2
    ON w.recordDate = DATE_ADD(w2.recordDate, INTERVAL 1 DAY)
     
)
SELECT id FROM CTE_Shifted WHERE temperature > temparatureYday