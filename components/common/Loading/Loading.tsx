import { motion } from "framer-motion";

const ballStyle = {
  display: "block",
  width: "1rem",
  height: "1rem",
  backgroundColor: "black",
  borderRadius: "0.5rem",
  margin: "0 auto"
};

const bounceTransition = {
  y: {
    duration: 0.4,
    yoyo: Infinity,
    ease: "easeOut"
  },
  backgroundColor: {
    duration: 0,
    yoyo: Infinity,
    ease: "easeOut",
    repeatDelay: 0.8
  }
};

function Loading() {
  return (
    <div className="h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-b from-cyan-500 to-blue-500">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 opacity-50">
          {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
          <div className="max-w-3xl mx-auto text-center">
            <div style={{
                width: "100%",
                marginBottom: "1rem",
                height: "2rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center"
              }}
            >
              <motion.span
                style={ballStyle}
                transition={bounceTransition}
                animate={{
                  y: ["100%", "-100%"],
                  backgroundColor: ["#ff6699", "#6666ff"]
                }}
              />
            </div>
            <h2 className="text-lg font-medium text-gray-900">Loading...</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading;