import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 mx-5 text-gray-300" dir="rtl">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white">المملكة لخدمات التنظيف</h3>
                        <p className="text-sm leading-relaxed">
                            نحن نقدم خدمات تنظيف وتعقيم احترافية للمنازل، الفلل، السيارات، والمزيد باستخدام أحدث التقنيات.
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">معلومات التواصل</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2">
                                <Phone size={18} />
                                <span>009660534831302
                                </span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail size={18} />
                                <span>elmamlaka@gmail.com</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <MapPin size={18} />
                                <span>الرياض، المملكة العربية السعودية</span>
                            </li>
                        </ul>
                    </div>

                    {/* Updated Services Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">خدماتنا</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="/services/cleaning-homes" className="hover:text-white transition">
                                    تنظيف وتعقيم المنازل والفلل والقصور
                                </a>
                            </li>
                            <li>
                                <a href="/services/pest-control" className="hover:text-white transition">
                                    خدمات مكافحة الحشرات والقوارض
                                </a>
                            </li>
                            <li>
                                <a href="/services/tank-cleaning" className="hover:text-white transition">
                                    تنظيف الخزانات والاحواض
                                </a>
                            </li>
                            <li>
                                <a href="/services/ac-curtains-carpets" className="hover:text-white transition">
                                    تنظيف المكيفات والستائر والسجاد
                                </a>
                            </li>
                            <li>
                                <a href="/services/furniture-cleaning" className="hover:text-white transition">
                                    تنظيف المجالس والكنب
                                </a>
                            </li>
                            <li>
                                <a href="/services/car-cleaning" className="hover:text-white transition">
                                    تنظيف وتعقيم السيارات
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Working Hours Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">ساعات العمل</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                                <Clock size={18} />
                                <span>أحد - الخميس: 8 صباحاً - 10 مساءً</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Clock size={18} />
                                <span>الجمعة والسبت: مغلق</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-sm">
                            جميع الحقوق محفوظة © {new Date().getFullYear()} - المملكة لخدمات التنظيف
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
