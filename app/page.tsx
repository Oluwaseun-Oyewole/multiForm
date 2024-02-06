"use client";
import { motion } from "framer-motion";
import FormLayout from "../components/Form/layout";

const visible = {
  opacity: 0,
  y: 0,
  display: "none",
  transition: { duration: 0.5 },
};

export default function Home() {
  return (
    <motion.main initial="hidden" animate="visible">
      <FormLayout />
    </motion.main>
  );
}
