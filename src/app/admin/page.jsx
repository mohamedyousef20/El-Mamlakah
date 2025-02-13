// "use client"
// import React, { useState } from 'react';
// import { Search, Plus, Phone, MessageCircle, Filter, Trash2, Edit } from 'lucide-react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// const Dashboard = () => {
//     const [activeTab, setActiveTab] = useState('companies');
//     const [searchTerm, setSearchTerm] = useState('');
//     const [filterOpen, setFilterOpen] = useState(false);

//     // Sample data - replace with your actual data
//     const [companies] = useState([
//         { id: 1, name: 'Company A', whatsappClicks: 45, phoneClicks: 32 },
//         { id: 2, name: 'Company B', whatsappClicks: 28, phoneClicks: 19 },
//     ]);

//     const [articles] = useState([
//         { id: 1, title: 'Article 1', company: 'Company A', date: '2024-02-12' },
//         { id: 2, title: 'Article 2', company: 'Company B', date: '2024-02-11' },
//     ]);

//     const renderMetricsCards = () => (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//             <Card>
//                 <CardHeader>
//                     <CardTitle>Total Companies</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <p className="text-2xl font-bold">{companies.length}</p>
//                 </CardContent>
//             </Card>
//             <Card>
//                 <CardHeader>
//                     <CardTitle>Total Articles</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <p className="text-2xl font-bold">{articles.length}</p>
//                 </CardContent>
//             </Card>
//             <Card>
//                 <CardHeader>
//                     <CardTitle>Total Interactions</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                     <p className="text-2xl font-bold">
//                         {companies.reduce((acc, comp) => acc + comp.whatsappClicks + comp.phoneClicks, 0)}
//                     </p>
//                 </CardContent>
//             </Card>
//         </div>
//     );

//     const renderCompanies = () => (
//         <div className="bg-white rounded-lg shadow">
//             <div className="p-4 border-b">
//                 <h2 className="text-xl font-semibold">Companies</h2>
//             </div>
//             <div className="overflow-x-auto">
//                 <table className="w-full">
//                     <thead className="bg-gray-50">
//                         <tr>
//                             <th className="p-4 text-left">Name</th>
//                             <th className="p-4 text-left">WhatsApp Clicks</th>
//                             <th className="p-4 text-left">Phone Clicks</th>
//                             <th className="p-4 text-left">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {companies.map((company) => (
//                             <tr key={company.id} className="border-t">
//                                 <td className="p-4">{company.name}</td>
//                                 <td className="p-4">
//                                     <div className="flex items-center">
//                                         <MessageCircle className="w-4 h-4 mr-2" />
//                                         {company.whatsappClicks}
//                                     </div>
//                                 </td>
//                                 <td className="p-4">
//                                     <div className="flex items-center">
//                                         <Phone className="w-4 h-4 mr-2" />
//                                         {company.phoneClicks}
//                                     </div>
//                                 </td>
//                                 <td className="p-4">
//                                     <div className="flex space-x-2">
//                                         <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
//                                             <Edit className="w-4 h-4" />
//                                         </button>
//                                         <button className="p-2 text-red-600 hover:bg-red-50 rounded">
//                                             <Trash2 className="w-4 h-4" />
//                                         </button>
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );

//     const renderArticles = () => (
//         <div className="bg-white rounded-lg shadow">
//             <div className="p-4 border-b">
//                 <h2 className="text-xl font-semibold">Articles</h2>
//             </div>
//             <div className="overflow-x-auto">
//                 <table className="w-full">
//                     <thead className="bg-gray-50">
//                         <tr>
//                             <th className="p-4 text-left">Title</th>
//                             <th className="p-4 text-left">Company</th>
//                             <th className="p-4 text-left">Date</th>
//                             <th className="p-4 text-left">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {articles.map((article) => (
//                             <tr key={article.id} className="border-t">
//                                 <td className="p-4">{article.title}</td>
//                                 <td className="p-4">{article.company}</td>
//                                 <td className="p-4">{article.date}</td>
//                                 <td className="p-4">
//                                     <div className="flex space-x-2">
//                                         <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
//                                             <Edit className="w-4 h-4" />
//                                         </button>
//                                         <button className="p-2 text-red-600 hover:bg-red-50 rounded">
//                                             <Trash2 className="w-4 h-4" />
//                                         </button>
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );

//     return (
//         <div className="min-h-screen bg-gray-100">
//             <div className="p-6">
//                 <div className="flex justify-between items-center mb-6">
//                     <h1 className="text-2xl font-bold">Dashboard</h1>
//                     <div className="flex space-x-4">
//                         <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center">
//                             <Plus className="w-4 h-4 mr-2" />
//                             Add New
//                         </button>
//                     </div>
//                 </div>

//                 {renderMetricsCards()}

//                 <div className="mb-6">
//                     <div className="flex space-x-4 items-center">
//                         <div className="relative flex-1">
//                             <input
//                                 type="text"
//                                 placeholder="Search..."
//                                 className="w-full pl-10 pr-4 py-2 border rounded-lg"
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                             />
//                             <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
//                         </div>
//                         <button
//                             className="p-2 border rounded-lg"
//                             onClick={() => setFilterOpen(!filterOpen)}
//                         >
//                             <Filter className="w-5 h-5" />
//                         </button>
//                     </div>
//                 </div>

//                 <div className="mb-6">
//                     <div className="flex space-x-4">
//                         <button
//                             className={`px-4 py-2 rounded-lg ${activeTab === 'companies'
//                                     ? 'bg-blue-600 text-white'
//                                     : 'bg-white text-gray-600'
//                                 }`}
//                             onClick={() => setActiveTab('companies')}
//                         >
//                             Companies
//                         </button>
//                         <button
//                             className={`px-4 py-2 rounded-lg ${activeTab === 'articles'
//                                     ? 'bg-blue-600 text-white'
//                                     : 'bg-white text-gray-600'
//                                 }`}
//                             onClick={() => setActiveTab('articles')}
//                         >
//                             Articles
//                         </button>
//                     </div>
//                 </div>

//                 {activeTab === 'companies' ? renderCompanies() : renderArticles()}
//             </div>
//         </div>
//     );
// };

// export default Dashboard;


"use client";
import React, { useState } from 'react';
import { Search, Plus, Phone, MessageCircle, Filter, Trash2, Edit } from 'lucide-react';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('companies');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterOpen, setFilterOpen] = useState(false);

    // Sample data
    const [companies] = useState([
        { id: 1, name: 'Company A', whatsappClicks: 45, phoneClicks: 32 },
        { id: 2, name: 'Company B', whatsappClicks: 28, phoneClicks: 19 },
    ]);

    const [articles] = useState([
        { id: 1, title: 'Article 1', company: 'Company A', date: '2024-02-12' },
        { id: 2, title: 'Article 2', company: 'Company B', date: '2024-02-11' },
    ]);

    const MetricCard = ({ title, value }) => (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    );

    const renderMetricsCards = () => (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <MetricCard title="Total Companies" value={companies.length} />
            <MetricCard title="Total Articles" value={articles.length} />
            <MetricCard
                title="Total Interactions"
                value={companies.reduce((acc, comp) => acc + comp.whatsappClicks + comp.phoneClicks, 0)}
            />
        </div>
    );

    const TableRow = ({ children }) => (
        <tr className="border-t hover:bg-gray-50">{children}</tr>
    );

    const TableCell = ({ children, className = '' }) => (
        <td className={`p-4 ${className}`}>{children}</td>
    );

    const renderCompanies = () => (
        <div className="bg-white rounded-lg shadow border">
            <div className="p-4 border-b">
                <h2 className="text-xl font-semibold">Companies</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-4 text-left">Name</th>
                            <th className="p-4 text-left">WhatsApp Clicks</th>
                            <th className="p-4 text-left">Phone Clicks</th>
                            <th className="p-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companies.map((company) => (
                            <TableRow key={company.id}>
                                <TableCell>{company.name}</TableCell>
                                <TableCell>
                                    <div className="flex items-center">
                                        <MessageCircle className="w-4 h-4 mr-2" />
                                        {company.whatsappClicks}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center">
                                        <Phone className="w-4 h-4 mr-2" />
                                        {company.phoneClicks}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    // Keep the rest of the code the same as your original implementation
    // [renderArticles, return statement, etc.]

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <div className="flex space-x-4">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700 transition-colors">
                            <Plus className="w-4 h-4 mr-2" />
                            Add New
                        </button>
                    </div>
                </div>

                {renderMetricsCards()}

                {/* Rest of your existing code remains the same */}
                {/* ... */}

            </div>
        </div>
    );
};

export default Dashboard;