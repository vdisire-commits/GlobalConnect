import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../features/user/userSlice';

const Profile = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const { profile, isLoading } = useSelector((state) => state.user);
    const { user: currentUser } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getUserProfile(userId));
    }, [userId, dispatch]);

    if (isLoading) {
        return <div className="text-center py-8">Loading...</div>;
    }

    if (!profile) {
        return <div className="text-center py-8">Profile not found</div>;
    }

    const isOwnProfile = currentUser?.id === profile._id;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="card mb-6">
                {profile.bannerImage && (
                    <img
                        src={profile.bannerImage}
                        alt="Banner"
                        className="w-full h-48 object-cover rounded-t-lg -mt-6 -mx-6 mb-4"
                    />
                )}

                <div className="flex items-start gap-6">
                    <img
                        src={profile.profilePicture || 'https://via.placeholder.com/150'}
                        alt={profile.name}
                        className="w-32 h-32 rounded-full border-4 border-white"
                    />

                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-text-primary">{profile.name}</h1>
                        {profile.headline && (
                            <p className="text-lg text-text-secondary mt-1">{profile.headline}</p>
                        )}
                        {profile.location && (
                            <p className="text-text-secondary mt-2 opacity-80">{profile.location}</p>
                        )}
                        {profile.bio && (
                            <p className="text-text-secondary mt-4">{profile.bio}</p>
                        )}
                    </div>

                    {!isOwnProfile && (
                        <div className="flex gap-2">
                            {profile.connections?.some(c => c._id === currentUser?.id || c === currentUser?.id) ? (
                                <>
                                    <button className="btn-secondary">Connected</button>
                                    <button
                                        className="btn-primary"
                                        onClick={() => window.location.href = `/messages?user=${profile._id}`}
                                    >
                                        Message
                                    </button>
                                </>
                            ) : profile.connectionRequests?.some(r => r.from === currentUser?.id || r.from?._id === currentUser?.id) ? (
                                <button className="btn-secondary" disabled>Pending</button>
                            ) : (
                                <button className="btn-primary">Connect</button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {profile.skills && profile.skills.length > 0 && (
                <div className="card mb-6">
                    <h2 className="text-xl font-bold text-text-primary mb-4">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {profile.skills.map((skill, index) => (
                            <span key={index} className="badge bg-accent/20 text-accent border border-accent/30">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {profile.experience && profile.experience.length > 0 && (
                <div className="card mb-6">
                    <h2 className="text-xl font-bold text-text-primary mb-4">Experience</h2>
                    <div className="space-y-4">
                        {profile.experience.map((exp, index) => (
                            <div key={index} className="border-l-2 border-accent pl-4">
                                <h3 className="font-semibold text-text-primary">{exp.role}</h3>
                                <p className="text-accent">{exp.company}</p>
                                <p className="text-sm text-text-secondary">
                                    {new Date(exp.startDate).getFullYear()} - {exp.current ? 'Present' : new Date(exp.endDate).getFullYear()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {profile.education && profile.education.length > 0 && (
                <div className="card">
                    <h2 className="text-xl font-bold text-text-primary mb-4">Education</h2>
                    <div className="space-y-4">
                        {profile.education.map((edu, index) => (
                            <div key={index} className="border-l-2 border-accent pl-4">
                                <h3 className="font-semibold text-text-primary">{edu.degree}</h3>
                                <p className="text-accent">{edu.school}</p>
                                <p className="text-sm text-text-secondary">
                                    {new Date(edu.startDate).getFullYear()} - {edu.current ? 'Present' : new Date(edu.endDate).getFullYear()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
