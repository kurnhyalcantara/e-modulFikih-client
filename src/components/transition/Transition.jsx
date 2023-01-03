import { motion } from "framer-motion/dist/framer-motion";
import PropTypes from "prop-types";

const animationConfiguration = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
const Transition = ({ children }) => {
  return (
    <motion.div
      variants={animationConfiguration}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

Transition.propTypes = {
  children: PropTypes.element,
};

export default Transition;
