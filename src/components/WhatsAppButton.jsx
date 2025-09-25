const WhatsAppButton = () => {
  const message = '¡Hola! Quiero más info sobre tus productos.';
  const phone = '+573017877391';
  const sanitizedPhone = phone.replace(/\D/g, '');
  const url = `https://wa.me/${sanitizedPhone}?text=${encodeURIComponent(message)}`;
 
  return (
    <a href={url} className="whatsapp-float" target="_blank" rel="noopener noreferrer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="28"
        height="28"
        fill="white"
      >
        <path d="M16 .8C7.6.8.8 7.6.8 16c0 2.8.7 5.5 2.1 7.9L1 31l7.3-1.9c2.3 1.3 5 2 7.7 2 8.4 0 15.2-6.8 15.2-15.2S24.4.8 16 .8zm0 27.8c-2.4 0-4.8-.6-6.8-1.9l-.5-.3-4.3 1.1 1.1-4.2-.3-.5c-1.3-2.1-2-4.5-2-7 0-7.3 5.9-13.2 13.2-13.2S29.2 8.7 29.2 16 23.3 28.6 16 28.6z"/>
        <path d="M23 19.6c-.4-.2-2.3-1.1-2.6-1.2-.4-.1-.7-.2-1 .2s-1.1 1.2-1.4 1.5c-.3.3-.5.3-1 .1s-2-1-3.8-2.9c-1.4-1.6-1.7-2.4-1.9-2.8s0-.6.2-.8c.2-.2.4-.5.6-.7s.3-.5.4-.7c.1-.2 0-.5 0-.7s-1-2.4-1.4-3.3c-.4-.9-.7-.8-1-.8h-.9c-.3 0-.7.1-1 .5s-1.3 1.3-1.3 3.1 1.4 3.6 1.6 3.9c.2.3 2.7 4.2 6.6 5.9.9.4 1.6.7 2.1.9.9.3 1.6.3 2.2.2.7-.1 2.3-.9 2.6-1.7.3-.8.3-1.5.2-1.7-.1-.2-.4-.3-.8-.5z"/>
      </svg>
    </a>
  );
};
 
export default WhatsAppButton;