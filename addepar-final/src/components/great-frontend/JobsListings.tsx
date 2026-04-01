import { useState, type FC, useEffect, useRef } from "react";
import './jobsListing.css';

const JOBS_PER_LOAD = 6;

const JobsListings: FC = () => {
    /**
     * 6 jobs on initial load
     * load more button to load next 6
        * load more should not be there when there are no more
     * if url field, make job title a link
        * link should open in a new window
     * format the timestamp       
     */
    const [jobIds, setJobIds] = useState([]);
    type JobType = any;

    const [jobDetailsById, setJobDetailsById] = useState<Record<number, JobType>>({});
    const isMounted = useRef(true);

    const [jobPageCount, setJobPageCount] = useState(1)

    useEffect(() => {
        isMounted.current = true;

        return () => { isMounted.current = false; }
    }, []);

    useEffect(() => {
        const fetchJobIds = async () => {
            const ids = await getJobPostingIds();
            setJobIds(ids);
        };
        fetchJobIds();
    }, []);

    useEffect(() => {
        if (jobIds.length === 0) return;

        const fetchJobDetails = async () => {
            const jobIdsToAdd = jobIds
                .slice(0, JOBS_PER_LOAD * jobPageCount)
                .filter((id: number) => !jobDetailsById[id]);
            if (jobIdsToAdd.length === 0) return;

            const jobDetails = await getJobDetailsById(jobIdsToAdd);
            setJobDetailsById((prev) => {
                const newJobDetails = jobDetails.reduce((acc, job) => {
                    acc[job.id] = job;
                    return acc;
                }, {} as Record<number, JobType>);
                return { ...prev, ...newJobDetails };
            });
        };
        fetchJobDetails();
    }, [jobIds, jobPageCount])

    const getJobPostingIds = async () => {
        const res = await fetch("https://hacker-news.firebaseio.com/v0/jobstories.json");
        const ids = await res.json();
        return ids;
    }

    const getJobDetailsById = async (ids: number[]) => {
        const jobDetails = [];
        for (const id of ids) {
            const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
            const jobDetail = await res.json();
            jobDetails.push(jobDetail);
        }
        return jobDetails;
    }

    const loadMoreJobs = () => {
        setJobPageCount(prev => prev + 1);
    }

    return (
        <>
            <h2>Hacker News Jobs Board</h2>
            {jobIds.slice(0, JOBS_PER_LOAD * jobPageCount).map((id: number) => {
                const jobDetails = jobDetailsById[id];
                if (jobDetails) {
                    const formattedDate = new Date(jobDetails.time)
                    return (
                        <div className="jobCard" key={id}>
                            {jobDetails.url ? 
                            <a href={jobDetails.url}><h3>{jobDetails.title}</h3></a> : <h3>{jobDetails.title}</h3>}
                            <p>By: {jobDetails.by} - { formattedDate.toLocaleString("en-US") }</p>
                        </div>);
                }

            })}
            <button onClick={loadMoreJobs}>Load more</button>
        </>
    )
}

export default JobsListings;