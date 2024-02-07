"use client";
import { motion } from "framer-motion";
import { Suspense } from "react";
import FormLayout from "../components/Form/layout";

export default function Home() {
  return (
    <motion.main>
      <Suspense>
        <FormLayout />
      </Suspense>
    </motion.main>
  );
}
