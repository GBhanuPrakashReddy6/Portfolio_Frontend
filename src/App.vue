<script setup>
import NavBar from '@/components/navbar/NavBar.vue'
import SectionIndex from '@/components/navbar/SectionIndex.vue'
import HeroSection from '@/components/hero/HeroSection.vue'
import ServicesSection from '@/components/services/ServicesSection.vue'
import ProjectsSection from '@/components/projects/ProjectsSection.vue'
import ContactSection from '@/components/contact/ContactSection.vue'
import RecommendationsSection from '@/components/recommendations/RecommendationsSection.vue'
import SiteFooter from '@/components/footer/SiteFooter.vue'
</script>

<template>
  <NavBar />
  <SectionIndex />
  <main>
    <HeroSection />
    <ServicesSection />
    <ProjectsSection />
    <ContactSection />
    <RecommendationsSection />
  </main>
  <SiteFooter />
</template>
