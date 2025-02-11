
const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-sage-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-playfair font-semibold text-accent">
              Sobre Nossa Abordagem
            </h2>
            <p className="text-gray-600">
              Com mais de 15 anos de experiência em terapia, nossa equipe está comprometida
              em proporcionar um ambiente seguro e acolhedor para seu crescimento pessoal.
            </p>
            <p className="text-gray-600">
              Acreditamos que cada pessoa é única e merece uma abordagem personalizada
              que respeite sua individualidade e processo de desenvolvimento.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-3xl font-semibold text-sage-600 mb-2">15+</div>
                <div className="text-gray-600">Anos de Experiência</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-3xl font-semibold text-sage-600 mb-2">1000+</div>
                <div className="text-gray-600">Clientes Atendidos</div>
              </div>
            </div>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-sage-500/20 to-sage-500/10" />
            <img
              src="/placeholder.svg"
              alt="Ambiente terapêutico"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
