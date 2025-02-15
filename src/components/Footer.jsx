import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 mx-5 text-gray-300" dir="rtl">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white">المملكة</h3>
                        <p className="text-sm leading-relaxed">
                            نحن نقدم خدمات متميزة وحلول متكاملة لعملائنا. نسعى دائماً لتقديم أفضل الخدمات بأعلى معايير الجودة.
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">معلومات التواصل</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2">
                                <Phone size={18} />
                                <span>+966 123 456 789</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail size={18} />
                                <span>info@elmamlakah.com</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <MapPin size={18} />
                                <span>الرياض، المملكة العربية السعودية</span>
                            </li>

                        </ul>
                    </div>

                    {/* Services */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">خدماتنا</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="/services/consulting" className="hover:text-white transition">الاستشارات الإدارية</a>
                            </li>
                            <li>
                                <a href="/services/training" className="hover:text-white transition">التدريب والتطوير</a>
                            </li>
                            <li>
                                <a href="/services/technology" className="hover:text-white transition">حلول تقنية المعلومات</a>
                            </li>
                            <li>
                                <a href="/services/marketing" className="hover:text-white transition">خدمات التسويق</a>
                            </li>
                        </ul>
                    </div>


                </div>

                {/* Bottom Section */}
                <div className="mt-12 pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-sm">
                            جميع الحقوق محفوظة © {new Date().getFullYear()} - شركة المملكة
                        </div>
                        <div className="flex gap-4">
                            <a href="/terms" className="text-sm hover:text-white transition">الشروط والأحكام</a>
                            <span>|</span>
                            <a href="/privacy" className="text-sm hover:text-white transition">سياسة الخصوصية</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;