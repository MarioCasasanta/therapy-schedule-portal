const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-sage-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-playfair font-semibold text-accent">
              Sobre mim: Mario Casasanta Neto
            </h2>
            <p className="text-gray-600">
              Sou Psicanalista e, após mais de 3 mil atendimentos, sei como é difícil sair do "coma emocional". 
              Aprendi que, para curar, precisamos primeiro entender nossos estados internos e colocar limites 
              saudáveis nas relações.
            </p>
            <p className="text-gray-600">
              Antes de me dedicar à psicanálise, atuei como gestor em uma grande empresa. Foi lá que percebi: 
              mais do que estratégias ou produtos, as pessoas precisam compreender a si mesmas.
            </p>
            <p className="text-gray-600">
              Hoje, com anos de experiência e um método ainda mais refinado, estou aqui para te ajudar a enxergar 
              novos caminhos, superar bloqueios e transformar sua vida de forma definitiva.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-3xl font-semibold text-sage-600 mb-2">3000+</div>
                <div className="text-gray-600">Atendimentos Realizados</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="text-3xl font-semibold text-sage-600 mb-2">100%</div>
                <div className="text-gray-600">Dedicação ao seu bem-estar</div>
              </div>
            </div>
            <button className="w-full bg-sage-500 text-white px-8 py-3 rounded-md hover:bg-sage-600 transition-all transform hover:-translate-y-1">
              Vamos juntos dar o próximo passo?
            </button>
          </div>
          <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl">
            <img
              src="/photo-1581091226825-a6a2a5aee158"
              alt="Mario Casasanta em seu ambiente de trabalho"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
