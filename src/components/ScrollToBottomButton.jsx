import { FaArrowDown } from "react-icons/fa";

function ScrollToBottomButton() {
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToBottom}
      className="fixed bottom-20 right-6 z-50 
      bg-gray-900 hover:bg-black text-white 
      p-3 rounded-full shadow-lg transition"
    >
      <FaArrowDown />
    </button>
  );
}

export default ScrollToBottomButton;
