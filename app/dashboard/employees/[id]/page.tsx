"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";


const employee = {
  id: 1,
  name: "Ahmad Ali",
  image: "/images/employees/person.jpg",
  department: "Emergency Department",
  role: "Doctor",
  employeeNumber: "EMP-00125",
  age: 34,
  gender: "Male",
  status: "Active",
};


export default function EmployeePage() {
const t = useTranslations("employee");

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 p-8">

      <div className="max-w-5xl mx-auto">

        {/* Header Card */}
        <section className="
          bg-white dark:bg-zinc-900 
          rounded-2xl 
          shadow-sm 
          border border-zinc-200 dark:border-zinc-800
          p-6
          flex
          items-center
          gap-6
        ">

          <Image
            src={employee.image}
            alt={employee.name}
            width={120}
            height={120}
            className="
              rounded-full
              object-cover
              border-4
              border-white
              dark:border-zinc-800
            "
          />


          <div className="space-y-2">

            <h1 className="
              text-2xl
              font-bold
              text-zinc-900
              dark:text-white
            ">
              {employee.name}
            </h1>


            <p className="text-zinc-500">
              {employee.role}
            </p>


            <div className="flex gap-3">

              <span className="
                px-3 py-1
                rounded-full
                text-xs
                bg-blue-100
                text-blue-700
              ">
                {employee.department}
              </span>


              <span className="
                px-3 py-1
                rounded-full
                text-xs
                bg-green-100
                text-green-700
              ">
                {employee.status}
              </span>

            </div>

          </div>

        </section>



        {/* Information Grid */}
        <section className="
          mt-6
          grid
          grid-cols-1
          md:grid-cols-3
          gap-4
        ">


          <InfoCard
            title="Employee ID"
            value={employee.employeeNumber}
          />


          <InfoCard
            title="Age"
            value={`${employee.age} years`}
          />


          <InfoCard
            title="Gender"
            value={employee.gender}
          />

        </section>



        {/* Future Sections */}

        <section className="
          mt-6
          bg-white dark:bg-zinc-900
          rounded-2xl
          border border-zinc-200 dark:border-zinc-800
          p-6
        ">

          <h2 className="
            font-semibold
            text-lg
            text-zinc-900
            dark:text-white
          ">
             {t("currentLocation")}
          </h2>


          <div className="
            mt-4
            h-40
            rounded-xl
            bg-zinc-100
            dark:bg-zinc-800
            flex
            items-center
            justify-center
            text-zinc-400
          ">
            Location will appear here
          </div>

        </section>



      </div>

    </div>
  );
}



function InfoCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {

  return (
    <div
      className="
        bg-white dark:bg-zinc-900
        border border-zinc-200 dark:border-zinc-800
        rounded-xl
        p-5
      "
    >

      <p className="text-sm text-zinc-500">
        {title}
      </p>


      <p className="
        mt-2
        font-semibold
        text-zinc-900
        dark:text-white
      ">
        {value}
      </p>

    </div>
  );
}