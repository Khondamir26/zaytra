import Footer from "@/components/Footer";
import Solutions from "@/components/Solutions";
import ProblemSolution from "@/components/ProblemSolution";

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Page header */}
      <section className="bg-gradient-to-b from-[#0B1F3A] via-[#0B1F3A]/90 to-background py-24">
        <div className="container mx-auto px-6 text-center space-y-4">
          <p className="text-xs font-semibold tracking-widest uppercase text-[#00C3C1]">What We Do</p>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Four Services. One Team.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00C3C1] to-[#7DD8FF]">
              Unlimited Potential.
            </span>
          </h1>
          <p className="text-white/60 max-w-xl mx-auto">
            Whether you need a landing page or a full SaaS platform, we have the expertise to deliver it — on budget and on time.
          </p>
        </div>
      </section>

      <Solutions />
      <ProblemSolution />

      <Footer />
    </div>
  );
}
