import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Age App Calculator</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/calculator-svgrepo-com.svg" />
      </Head>
      <main className="font-['Poppins']  flex flex-col  min-h-screen  items-center bg-template_off_white">
      <CalendarComponent />
      </main>
    </>
  );
};


function CalendarComponent(){

  return(

    <div className=" mt-20 max-w-xs bg-[#fff] py-4 px-6 rounded-2xl rounded-br-[4.5em] shadow-sm">
    <AgeForm />
    <div>
      <p className="my-3 text-center">something goes here</p>
    </div>
    <DisplayResult />
    </div>
  
  )
}
function AgeForm() {
  return (
    <>
      <form action="" className="flex outline">
        <div className="flex flex-col w-1/3 ">
          <label
            htmlFor="day"
            className=" text-xs uppercase text-template_smokey_grey font-light"
          >
            Day
          </label>
          <input
          className="text-xl bg-sky-500"
            type="text"
            inputMode="numeric"
            pattern="d?d"
            id="day"
            defaultValue={24}
          />
        </div>

        <div className="flex flex-col w-1/3 ">
          <label
            htmlFor="month"
            className=" text-xs uppercase text-template_smokey_grey font-light"
          >
            Month
          </label>
          <input
          className="text-xl bg-sky-500"
            type="text"
            inputMode="numeric"
            pattern="d?d"
            id="month"
            defaultValue={"09"}
          />
        </div>

        <div className="flex flex-col w-1/3 ">
          <label
            htmlFor="year"
            className=" text-xs uppercase text-template_smokey_grey font-light"
          >
            Year
          </label>
          <input
          className="text-xl bg-sky-500"
            type="text"
            inputMode="numeric"
            pattern="dddd"
            id="year"
            defaultValue={1984}
          />
        </div>
      </form>
    </>
  );
}

function DisplayResult() {
  return (
    <>
      <h1 className="  text-5xl  font-extrabold italic outline-dotted ">
        <span className=" text-template_purple">38</span> years
        <br></br>
        <span className=" text-template_purple">3</span> months
        <br></br>
        <span className=" text-template_purple">26</span> days
      </h1>
    </>
  );
}
export default Home;
