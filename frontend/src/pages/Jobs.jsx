import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getJobs, getRecommendedJobs } from '../features/job/jobSlice';
import JobCard from '../components/JobCard';

const Jobs = () => {
    const dispatch = useDispatch();
    const { jobs, recommendedJobs, isLoading } = useSelector((state) => state.job);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        location: '',
        jobType: '',
    });

    useEffect(() => {
        dispatch(getJobs());
        dispatch(getRecommendedJobs());
    }, [dispatch]);

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(getJobs({ query: searchQuery, ...filters }));
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="card mb-6">
                <h1 className="text-2xl font-bold text-text-primary mb-4">Find Jobs</h1>

                <form onSubmit={handleSearch} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            type="text"
                            placeholder="Search jobs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input-field"
                        />
                        <input
                            type="text"
                            placeholder="Location"
                            value={filters.location}
                            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                            className="input-field"
                        />
                        <select
                            value={filters.jobType}
                            onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
                            className="input-field bg-secondary text-text-primary border-border"
                        >
                            <option value="">All Types</option>
                            <option value="full-time">Full Time</option>
                            <option value="part-time">Part Time</option>
                            <option value="contract">Contract</option>
                            <option value="internship">Internship</option>
                            <option value="remote">Remote</option>
                        </select>
                    </div>
                    <button type="submit" className="btn-primary">
                        Search
                    </button>
                </form>
            </div>

            {recommendedJobs.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-text-primary mb-4">Recommended for You</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {recommendedJobs.map((job) => (
                            <JobCard key={job._id} job={job} />
                        ))}
                    </div>
                </div>
            )}

            <div>
                <h2 className="text-xl font-bold text-text-primary mb-4">All Jobs</h2>
                {isLoading ? (
                    <div className="text-center py-8 text-text-secondary">Loading...</div>
                ) : jobs.length === 0 ? (
                    <div className="card text-center py-8 text-text-secondary">
                        No jobs found
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {jobs.map((job) => (
                            <JobCard key={job._id} job={job} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Jobs;
