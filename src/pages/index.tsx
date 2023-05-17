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
      <main className="flex  min-h-screen flex-col  items-center  bg-template_off_white font-['Poppins']">
        <CalendarComponent />
      </main>
    </>
  );
};

function CalendarComponent() {
  return (
    <div className=" mt-20 max-w-[340px] rounded-2xl rounded-br-[4.5em] bg-[#fff] px-6 py-4 shadow-sm">
      <AgeForm />
      <div>
        <p className="my-3 text-center">something goes here</p>
      </div>
      <DisplayResult />
    </div>
  );
}
function AgeForm() {
  return (
    <>
      <form action="" className="flex mt-5">
        <div className="flex w-1/3 flex-col pr-5 ">
          <label
            htmlFor="day"
            className=" text-xs font-light uppercase text-template_smokey_grey"
          >
            Day
          </label>
          <input
            className="m-1  ml-[.10rem] rounded py-1 pl-3 text-xl mix-blend-darken ring-1 ring-template_ligth_grey  "
            type="text"
            inputMode="numeric"
            pattern="d?d"
            id="day"
            defaultValue={24}
          />
        </div>

        <div className="flex w-1/3 flex-col pr-5 ">
          <label
            htmlFor="month"
            className=" text-xs font-light uppercase text-template_smokey_grey"
          >
            Month
          </label>
          <input
            className="m-1  ml-[.10rem] rounded py-1 pl-3 text-xl mix-blend-darken ring-1 ring-template_ligth_grey  "
            type="text"
            inputMode="numeric"
            pattern="d?d"
            id="month"
            defaultValue={"09"}
          />
        </div>

        <div className="flex w-1/3 flex-col pr-5 ">
          <label
            htmlFor="year"
            className=" text-xs font-light uppercase text-template_smokey_grey"
          >
            Year
          </label>
          <input
            className="m-1  ml-[.10rem] rounded  py-1 pl-3 text-xl mix-blend-darken ring-1 ring-template_ligth_grey  "
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
      <h1 className="  text-5xl  font-extrabold italic mb-6 ">
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
