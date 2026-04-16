import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center px-8 text-center">
      <span className="font-headline text-[120px] text-tertiary-fixed-dim leading-none font-bold mb-4">404</span>
      <h1 className="font-headline text-4xl text-primary mb-4">Page not found.</h1>
      <p className="text-on-surface-variant text-lg max-w-md mb-10 leading-relaxed">
        The page you're looking for has moved or doesn't exist. Let's get you back on track.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/" className="bg-primary text-white px-10 py-4 rounded-md font-bold hover:bg-primary/90 transition-colors">
          Back to Home
        </Link>
        <Link to="/apply" className="border-2 border-primary text-primary px-10 py-4 rounded-md font-bold hover:bg-primary hover:text-white transition-colors">
          Get a Free Estimate
        </Link>
      </div>
    </section>
  );
}
