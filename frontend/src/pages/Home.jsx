import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="text-center py-20 bg-primary min-h-[calc(100vh-64px)]">
            <h1 className="text-5xl font-bold text-accent mb-4">
                Welcome to GlobalConnect
            </h1>
            <p className="text-xl text-text-secondary mb-8">
                Connect with professionals, find opportunities, grow your career
            </p>
            <Link to="/feed" className="btn-primary text-lg px-8 py-3">
                Go to Feed
            </Link>
        </div>
    );
};

export default Home;
