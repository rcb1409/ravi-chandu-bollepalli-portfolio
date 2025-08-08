import { useState } from "react";
import { RevealOnScroll } from "../RevealOnScroll"
import emailjs from 'emailjs-com';

export const Contact = () => {
    const [formData, setFormData] = useState(
        {
            name:"",
            email:"",
            message:""
        }
    );

    const handleOnSubmit = (e) => {
        e.preventDefault();
        emailjs.sendForm(  import.meta.env.VITE_SERVICE_ID,
  import.meta.env.VITE_TEMPLATE_ID,
  e.target,
  import.meta.env.VITE_PUBLIC_KEY).then((result) => {
            alert("Message Sent!");
            setFormData({
                name:"", email:"", message:""
            })
        }).catch(() => alert("Oops! Something Went Wrong. Please Try Again!")) 
    }
    return (
        <section id="contact" className="min-h-screen flex items-center justify-center py-20">
            <RevealOnScroll>
                <div className="px-4 w-150">
                    <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
                        Get In Touch!
                    </h2>
                    <form onSubmit={handleOnSubmit}>
                        <div className="relative">
                            <input 
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                required
                                placeholder="Name"
                                onChange={(e) => {setFormData({...formData, name: e.target.value})}}
                                className="w-full px-4 py-3 mb-4 border border-white/10 rounded text-white bg-white/5 focus:outline-none focus:border-blue-5-- focus:bg-blue-500/5 "
                            />
                        </div>
                        <div className="relative">
                            <input 
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                required
                                placeholder="Email"
                                onChange={(e) => {setFormData({...formData, email: e.target.value})}}
                                className="w-full px-4 py-3 mb-4 border border-white/10 rounded text-white bg-white/5 focus:outline-none focus:border-blue-5-- focus:bg-blue-500/5 "
                            />
                        </div>
                        <div className="relative">
                            <textarea 
                                id="message"
                                name="message"
                                value={formData.message}
                                required
                                placeholder="Your Message.."
                                rows={5}
                                onChange={(e) => {setFormData({...formData, message: e.target.value})}}
                                className="w-full px-4 py-3 mb-4 border border-white/10 rounded text-white bg-white/5 focus:outline-none focus:border-blue-5-- focus:bg-blue-500/5 "
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-3 px-6 rounded font-medium relative hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] "
                        >
                            Send Message
                        </button> 
                    </form>
                </div>
            </RevealOnScroll>

        </section>
    )
}