import React, { useState } from 'react';
import {
  Plus,
  Home,
  Car,
  GraduationCap,
  X,
  Wallet,
  MoreVertical
} from 'lucide-react';

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  PieChart,
  Pie,
  Cell,
  Tooltip
} from "recharts";


function Dashboard() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const pieData = [
    { name: "Principal", value: 72 },
    { name: "Interest", value: 28 }
  ]

  const COLORS = ["#1a2e05", "#d9e7d3"]

  const [loans, setLoans] = useState([
    {
      id: 1,
      bank: "HDFC BANK",
      type: "HOME LOAN",
      amount: 1500000,
      rate: 8.5,
      emi: 25000,
      duration: "15 Years"
    }
  ]);

  const [formData, setFormData] = useState({
    bank: '',
    type: 'Personal',
    amount: '',
    rate: '',
    emi: '',
    duration: ''
  });

  const data = [
    { month: "OCT 23", value: 20 },
    { month: "JAN 24", value: 32 },
    { month: "APR 24", value: 50 },
    { month: "JUL 24", value: 75 },
    { month: "OCT 24", value: 110 },
  ];

  const now = new Date();

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const currentMonth = monthNames[now.getMonth()];
  const currentYear = now.getFullYear();
  const todayDate = now.getDate();

  const getCalendarDays = () => {

    const year = now.getFullYear();
    const month = now.getMonth();

    const firstDay = new Date(year, month, 1).getDay();

    const daysInMonth =
      new Date(year, month + 1, 0).getDate();

    const prevMonthDays =
      new Date(year, month, 0).getDate();

    const days = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        currentMonth: false
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        currentMonth: true
      });
    }

    return days.slice(0, 14);
  };

  const calendarDays = getCalendarDays();

  const getIcon = (type) => {

    if (type.includes('Home') || type.includes('Mortgage')) {
      return <Home size={20} />;
    }

    if (type.includes('Auto') || type.includes('Car')) {
      return <Car size={20} />;
    }

    if (type.includes('Student')) {
      return <GraduationCap size={20} />;
    }

    return <Wallet size={20} />;
  };

  const handleCreateLoan = (e) => {

    e.preventDefault();

    const newLoan = {
      id: Date.now(),
      bank: formData.bank,
      type: formData.type,
      amount: parseFloat(formData.amount),
      rate: parseFloat(formData.rate),
      emi: parseFloat(formData.emi),
      duration: formData.duration
    };

    setLoans([newLoan, ...loans]);

    setFormData({
      bank: '',
      type: 'Personal',
      amount: '',
      rate: '',
      emi: '',
      duration: ''
    });

    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans">

      <main className="max-w-7xl mx-auto p-4 md:p-10 flex flex-col gap-8">

        <section className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

          <div>
            <h1 className="font-bold text-3xl md:text-4xl text-slate-900 mb-2">
              Finance Architecture
            </h1>

            <p className="text-sm md:text-lg text-slate-500">
              Wealth Architecture | Dashboard Overview
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-950 text-white px-6 py-3 rounded-full hover:bg-emerald-900 transition-all flex items-center gap-2 font-bold text-sm uppercase tracking-wider w-full sm:w-fit justify-center"
          >
            <Plus size={18} />
            Add New Loan
          </button>

        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          <div className='bg-white p-5 rounded-2xl shadow relative'>
            <div className='w-12 h-12 rounded-xl bg-green-700/20 flex items-center justify-center'>
              <img src='https://www.svgrepo.com/show/326606/document-text-outline.svg' className='h-8'/>
            </div>

            <p className='text-slate-500 mt-5 font-semibold'>
              Total active loans
            </p>

            <h2 className='text-2xl font-bold text-slate-800 mt-1'>
              {loans.length}
            </h2>
          </div>

          <div className='bg-white p-5 rounded-2xl shadow relative'>
            <div className='w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center'>
              <img src='https://www.svgrepo.com/show/383783/money-cash.svg' className='h-8'/>
            </div>

            <p className='text-slate-500 mt-5 font-semibold'>
              Total monthly EMI
            </p>

            <h2 className='text-2xl font-bold text-slate-800 mt-1'>
              ₹42,500
            </h2>
          </div>

          <div className='bg-white p-5 rounded-2xl shadow relative'>
            <div className='w-12 h-12 rounded-xl bg-slate-600/20 flex items-center justify-center'>
              <img src='https://www.svgrepo.com/show/532457/wallet.svg' className='h-8'/>
            </div>

            <p className='text-slate-500 mt-5 font-semibold'>
              Outstanding Debt
            </p>

            <h2 className='text-2xl font-bold text-slate-800 mt-1'>
              ₹18,40,000
            </h2>
          </div>

        </section>

        <section className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">

          <div className='bg-white rounded-2xl shadow p-5'>

            <div className='flex flex-col sm:flex-row justify-between gap-4 mb-6'>

              <p className='font-bold text-slate-800'>
                Loan PayOff Progress
              </p>

              <div className='flex gap-2 flex-wrap'>
                <span className='bg-slate-100 px-3 py-1 rounded-lg text-xs font-bold text-slate-600'>
                  12 Months
                </span>

                <span className='bg-slate-100 px-3 py-1 rounded-lg text-xs font-bold text-slate-600'>
                  All Accounts
                </span>
              </div>

            </div>

            <div className="w-full h-[320px]">

              <ResponsiveContainer width="100%" height="100%">

                <AreaChart data={data}>

                  <defs>
                    <linearGradient
                      id="fillColor"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#12261d"
                        stopOpacity={0.15}
                      />

                      <stop
                        offset="100%"
                        stopColor="#12261d"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>

                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                  />

                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#12261d"
                    strokeWidth={6}
                    fill="url(#fillColor)"
                  />

                </AreaChart>

              </ResponsiveContainer>

            </div>

          </div>

          <div className="bg-white rounded-2xl shadow p-6 flex flex-col gap-6">

            <div>
              <p className="text-xl font-bold text-slate-800">
                Interest vs Principal
              </p>

              <p className="text-sm text-slate-500 mt-1">
                Loan repayment distribution
              </p>
            </div>

            <div className="h-[280px] w-full relative">

              <ResponsiveContainer width="100%" height="100%">
                <PieChart>

                  <Pie
                    data={pieData}
                    innerRadius={85}
                    outerRadius={110}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index]}
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#12261d",
                      border: "none",
                      borderRadius: "16px",
                      color: "white",
                      padding: "12px"
                    }}
                    labelStyle={{
                      color: "#d1fae5",
                      fontWeight: "bold"
                    }}
                    itemStyle={{
                      color: "white",
                      fontSize: "14px"
                    }}
                  />

                </PieChart>
              </ResponsiveContainer>

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-5xl font-bold text-[#1a2e05]">
                  72%
                </p>

                <p className="text-sm text-slate-500 tracking-wide mt-1">
                  Principal
                </p>
              </div>

            </div>

            <div className="flex justify-center gap-6">

              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#1a2e05]"></div>

                <p className="text-sm font-semibold text-slate-700">
                  Principal
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#d9e7d3]"></div>

                <p className="text-sm font-semibold text-slate-700">
                  Interest
                </p>
              </div>

            </div>

          </div>

        </section>

        <section className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">

          <div className='bg-white shadow rounded-2xl overflow-hidden'>

            <div className='p-5 border-b flex justify-between items-center flex-wrap gap-3'>
              <p className='font-bold text-slate-800'>
                Active Loan Manager
              </p>

              <p className='text-xs font-bold text-slate-500'>
                VIEW ALL
              </p>
            </div>

            <div className='hidden md:grid grid-cols-5 px-5 py-4 border-b text-xs font-bold text-slate-500'>
              <p>LOAN</p>
              <p>PRINCIPAL</p>
              <p>RATE</p>
              <p>EMI</p>
              <p>ACTION</p>
            </div>

            <div className='max-h-[400px] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'>

              {loans.map((loan) => (

                <div
                  key={loan.id}
                  className='grid grid-cols-1 md:grid-cols-5 gap-4 p-5 items-center'
                >

                  <div className='flex items-center gap-3'>

                    <div className='bg-green-100 p-2 rounded-xl text-green-950'>
                      {getIcon(loan.type)}
                    </div>

                    <div>
                      <p className='font-bold text-sm'>
                        {loan.type}
                      </p>

                      <p className='text-xs text-slate-500'>
                        {loan.bank}
                      </p>
                    </div>

                  </div>

                  <p className='font-semibold'>
                    ₹{loan.amount.toLocaleString()}
                  </p>

                  <p>{loan.rate}%</p>

                  <p>₹{loan.emi}</p>

                  <div className='flex justify-start md:justify-center'>
                    <MoreVertical size={18} />
                  </div>

                </div>

              ))}

            </div>

          </div>

          <div className='bg-white shadow rounded-2xl p-5'>

            <div className="flex justify-between items-center mb-5">

              <h2 className="font-bold text-lg text-slate-800">
                EMI CALENDAR
              </h2>

              <span className="font-bold text-slate-700 text-sm">
                {currentMonth} {currentYear}
              </span>

            </div>

            <div className="grid grid-cols-7 gap-y-3 text-center">

              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                <span
                  key={d}
                  className="text-[10px] font-bold text-slate-400"
                >
                  {d}
                </span>
              ))}

              {calendarDays.map((item, i) => {

                const isToday =
                  item.currentMonth &&
                  item.day === todayDate;

                return (
                  <div
                    key={i}
                    className='flex justify-center'
                  >

                    <div
                      className={`
                        h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold
                        ${isToday
                          ? "bg-green-950 text-white"
                          : "text-slate-600"}
                      `}
                    >
                      {item.day}
                    </div>

                  </div>
                );
              })}

            </div>

          </div>

        </section>

      </main>

      {isModalOpen && (

        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-[2rem] p-6 md:p-10 w-full max-w-xl">

            <div className='flex justify-between items-center mb-8'>

              <h2 className='text-3xl font-bold text-slate-800'>
                Add New Loan
              </h2>

              <button onClick={() => setIsModalOpen(false)}>
                <X />
              </button>

            </div>

            <form
              onSubmit={handleCreateLoan}
              className='flex flex-col gap-5'
            >

              <input
                required
                type="text"
                placeholder='Bank Name'
                className='w-full bg-slate-50 p-4 rounded-2xl outline-none'
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    bank: e.target.value
                  })
                }
              />

              <select
                className='w-full bg-slate-50 p-4 rounded-2xl outline-none'
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    type: e.target.value
                  })
                }
              >
                <option>Personal</option>
                <option>Mortgage</option>
                <option>Auto Loan</option>
                <option>Student Loan</option>
              </select>

              <input
                required
                type="number"
                placeholder='Principal Amount'
                className='w-full bg-slate-50 p-4 rounded-2xl outline-none'
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    amount: e.target.value
                  })
                }
              />

              <input
                required
                type="number"
                placeholder='Interest Rate'
                className='w-full bg-slate-50 p-4 rounded-2xl outline-none'
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    rate: e.target.value
                  })
                }
              />

              <input
                required
                type="number"
                placeholder='Monthly EMI'
                className='w-full bg-slate-50 p-4 rounded-2xl outline-none'
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    emi: e.target.value
                  })
                }
              />

              <input
                required
                type="text"
                placeholder='Duration'
                className='w-full bg-slate-50 p-4 rounded-2xl outline-none'
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    duration: e.target.value
                  })
                }
              />

              <button
                type='submit'
                className='bg-emerald-950 text-white py-4 rounded-2xl font-bold'
              >
                Add Loan
              </button>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Dashboard;