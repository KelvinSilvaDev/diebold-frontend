'use client'
import { CustomerSelector } from "../components/CustomerSelector";
import { FormConfig } from "../components/FormConfig";

export default function SettingsPage(){
    return (
        <main className="mx-auto flex flex-col flex-1  align-middle justify-center max-w-full w-ful px-4  pt-4">
            <div className="flex flex-col py-2 bg-white w-full justify-end items-end  pt-4 rounded-lg shadow-lg">
                <section className="flex justify-end items-end px-4">
                    {/* <CustomerSelector/> */}
                </section>
                <section className="px-4 w-full">
                    <FormConfig/>
                </section>
            </div>
            
        </main>
    )
}