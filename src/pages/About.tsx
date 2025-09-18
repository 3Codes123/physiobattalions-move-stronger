import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-primary/90 text-white py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
            <p className="text-xl max-w-3xl">
              Dedicated to providing exceptional physiotherapy and wellness services to help you live your best life.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-4">
                  Founded with a vision to revolutionize physiotherapy and wellness services, our clinic has been at the 
                  forefront of patient care and innovative treatment approaches. What started as a single practice has 
                  grown into a comprehensive wellness center serving the community with dedication and expertise.
                </p>
                <p className="text-gray-700 mb-4">
                  Our team of certified professionals brings together years of experience and a shared commitment to 
                  helping our patients achieve their health and wellness goals. We believe in a holistic approach that 
                  addresses the root causes of discomfort and promotes long-term well-being.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Team</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Dr. Sarah Johnson",
                  role: "Lead Physiotherapist",
                  bio: "With over 15 years of experience in sports rehabilitation, Dr. Johnson specializes in injury recovery and performance enhancement.",
                  image: "/img/team/doctor1.jpg"
                },
                {
                  name: "Michael Chen",
                  role: "Senior Physiotherapist",
                  bio: "Specializing in orthopedic and post-surgical rehabilitation, Michael brings a wealth of knowledge in pain management.",
                  image: "/img/team/doctor2.jpg"
                },
                {
                  name: "Priya Patel",
                  role: "Wellness Coach",
                  bio: "A certified yoga instructor and nutritionist, Priya helps patients achieve holistic wellness through lifestyle changes.",
                  image: "/img/team/doctor3.jpg"
                }
              ].map((member, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-48 bg-gray-200">
                    {member.image && (
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/400x300?text=Team+Member';
                        }}
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission & Values</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Mission</h3>
                  <p className="text-gray-700">
                    To empower individuals to achieve optimal health and wellness through personalized, 
                    evidence-based physiotherapy and comprehensive care that addresses the whole person.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Our Values</h3>
                  <ul className="space-y-2">
                    {[
                      "Patient-centered care",
                      "Clinical excellence",
                      "Compassion and empathy",
                      "Continuous learning",
                      "Integrity and transparency"
                    ].map((value, i) => (
                      <li key={i} className="flex items-start">
                        <svg className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
