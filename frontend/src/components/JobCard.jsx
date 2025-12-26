import { useDispatch } from 'react-redux';
import { applyToJob } from '../features/job/jobSlice';

const JobCard = ({ job }) => {
    const dispatch = useDispatch();

    const handleApply = () => {
        const coverLetter = prompt('Enter your cover letter:');
        if (coverLetter) {
            dispatch(applyToJob({ jobId: job._id, coverLetter }));
        }
    };

    return (
        <div className="card hover:border-accent/40 transition-colors cursor-pointer group">
            <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-accent transition-colors">{job.title}</h3>
            <p className="text-accent font-semibold mb-2">{job.company}</p>
            <p className="text-text-secondary text-sm mb-4 flex items-center gap-1">
                <span className="opacity-70">📍</span> {job.location}
            </p>

            <p className="text-text-secondary text-sm mb-4 line-clamp-3 leading-relaxed">{job.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
                {job.skills?.map((skill, index) => (
                    <span key={index} className="badge bg-accent/10 text-accent border border-accent/20">
                        {skill}
                    </span>
                ))}
            </div>

            <div className="flex items-center justify-between mt-auto">
                <div className="text-sm text-text-secondary flex items-center gap-2">
                    <span className="badge bg-secondary text-text-primary border border-border">{job.jobType}</span>
                    {job.salary && (
                        <span className="font-medium text-text-primary">
                            ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}
                        </span>
                    )}
                </div>
                <button onClick={handleApply} className="btn-primary text-sm py-2 px-4">
                    Apply Now
                </button>
            </div>
        </div>
    );
};

export default JobCard;
