import MenuSection from "@/app/components/MenuSection";
import Navigation from "@/app/components/Navigation";

export default function Menu() {
  return (
    <main className="flex min-h-screen flex-col container mx-auto px-12 py-4 bg-black">
      <header className="flex justify-between">
        <h3 className='font-bold text-white text-3xl lg:text-xl my-auto'>Appministration</h3>
        <div className="flex float-left my-auto"> 
          <Navigation />
        </div>
      </header>
      <section>
        <MenuSection/>
      </section>
    </main>
  )
}