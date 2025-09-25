const Footer = () => {
  return (
    <footer className="bg-[#f8f8f8] border-t border-[#e5e5e5] pt-12 pb-6 mt-16">
      <div className="container mx-auto px-6">
        {/* Secciones de enlaces */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="space-y-4">
            <h3 className="text-[#1a1a1a] font-medium text-sm uppercase tracking-wider">Tienda</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-[#666] hover:text-[#d4af37] transition-colors text-sm">Todos los productos</a></li>
              <li><a href="#" className="text-[#666] hover:text-[#d4af37] transition-colors text-sm">Destacados</a></li>
              <li><a href="#" className="text-[#666] hover:text-[#d4af37] transition-colors text-sm">Ofertas</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-[#1a1a1a] font-medium text-sm uppercase tracking-wider">Soporte</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-[#666] hover:text-[#d4af37] transition-colors text-sm">Ayuda en línea</a></li>
              <li><a href="#" className="text-[#666] hover:text-[#d4af37] transition-colors text-sm">Contacto</a></li>
              <li><a href="#" className="text-[#666] hover:text-[#d4af37] transition-colors text-sm">Devoluciones</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-[#1a1a1a] font-medium text-sm uppercase tracking-wider">Empresa</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-[#666] hover:text-[#d4af37] transition-colors text-sm">Sobre nosotros</a></li>
              <li><a href="#" className="text-[#666] hover:text-[#d4af37] transition-colors text-sm">Trabaja con nosotros</a></li>
              <li><a href="#" className="text-[#666] hover:text-[#d4af37] transition-colors text-sm">Prensa</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-[#1a1a1a] font-medium text-sm uppercase tracking-wider">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-[#666] hover:text-[#d4af37] transition-colors text-sm">Términos y condiciones</a></li>
              <li><a href="#" className="text-[#666] hover:text-[#d4af37] transition-colors text-sm">Política de privacidad</a></li>
              <li><a href="#" className="text-[#666] hover:text-[#d4af37] transition-colors text-sm">Cookies</a></li>
            </ul>
          </div>
        </div>

        {/* Border divisor */}
        <div className="border-t border-[#e5e5e5] my-6"></div>

        {/* Copyright y logo */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-[#1a1a1a] font-bold text-lg font-serif">E-Commerce</span>
          </div>
          <p className="text-[#666] text-xs mt-4 md:mt-0">
            &copy; {new Date().getFullYear()} E-Commerce. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
