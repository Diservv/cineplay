"use client";

import { Button, Card, CardBody, Chip, Divider, Link } from "@heroui/react";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiSupabase,
  SiReact,
} from "react-icons/si";
import { FaGithub, FaDiscord, FaInstagram, FaEnvelope, FaWhatsapp, FaNetworkWired, FaGlobe } from "react-icons/fa";
import { MdMovie, MdSecurity, MdSpeed, MdDevices } from "react-icons/md";

const TECH_STACK = [
  { name: "Next.js 15", icon: <SiNextdotjs size={20} /> },
  { name: "React", icon: <SiReact size={20} /> },
  { name: "TypeScript", icon: <SiTypescript size={20} /> },
  { name: "Tailwind CSS 4", icon: <SiTailwindcss size={20} /> },
  { name: "Supabase", icon: <SiSupabase size={20} /> },
];

const FEATURES = [
  {
    icon: <MdMovie size={28} />,
    title: "Vast Library",
    description: "Thousands of movies and TV shows powered by the TMDB API.",
  },
  {
    icon: <MdDevices size={28} />,
    title: "All Devices",
    description: "Fully responsive and installable as a PWA on any device.",
  },
  {
    icon: <MdSpeed size={28} />,
    title: "Fast & Modern",
    description: "Built with the latest web technologies for a smooth experience.",
  },
  {
    icon: <MdSecurity size={28} />,
    title: "Safe to Use",
    description: "We don't store any files. All content is served via third-party providers.",
  },
];

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    description: "Projects & Builds",
    href: "https://github.com/kaptech_dev/",
    icon: <FaGithub size={22} />,
    color: "default" as const,
  },
  {
    name: "Discord",
    description: "Join our community",
    href: "https://discord.gg/kaptech_dev",
    icon: <FaDiscord size={22} />,
    color: "primary" as const,
  },
  {
    name: "Instagram",
    description: "Follow for updates",
    href: "https://instagram.com/kaptech_dev",
    icon: <FaInstagram size={22} />,
    color: "primary" as const,
  },
];

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-12">

      {/* Hero */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Sobre</h1>
        <p className="text-default-500 text-lg max-w-2xl mx-auto">
          CINEplay é uma plataforma de streaming gratuita e de código aberto onde você pode descobrir e assistir
filmes e programas de TV — sem assinatura, sem complicações.
        </p>
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          <Chip color="success" variant="flat">Free</Chip>
          <Chip color="primary" variant="flat">Streaming</Chip>
          <Chip color="secondary" variant="flat">TV-Shows</Chip>
          <Chip variant="flat">Movies</Chip>
        </div>
      </section>

      <Divider />

      {/* What is CINEplay */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">O que é CINEplay?</h2>
        <p className="text-default-500 leading-relaxed">
          CINEplay é uma plataforma de streaming de filmes e séries de TV de código aberto, construída com tecnologias web modernas.
Foi criada para dar a todos acesso fácil e gratuito a uma vasta biblioteca de conteúdo — tudo em um só lugar.
Nós usamos a{" "}
          <Link /*href="https://www.themoviedb.org/"*/ target="_blank" className="font-semibold">
            TMDB API
          </Link>{" "}
          Fornecer metadados, pôsteres e informações atualizadas para todos os títulos.
        </p>
        <p className="text-default-500 leading-relaxed">
          Não hospedamos nem armazenamos nenhum arquivo de mídia. Todo o conteúdo de streaming é fornecido por meio de provedores de vídeo terceirizados. O CINEPLAY funciona exclusivamente como uma interface de descoberta e visualização.
        </p>
      </section>

      <Divider />

      {/* Features */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FEATURES.map(({ icon, title, description }) => (
            <Card key={title} shadow="sm">
              <CardBody className="flex flex-row items-start gap-4 p-5">
                <div className="text-primary mt-0.5">{icon}</div>
                <div>
                  <p className="font-semibold">{title}</p>
                  <p className="text-default-500 text-sm">{description}</p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      <Divider />

      {/* Tech Stack */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Built With</h2>
        <div className="flex flex-wrap gap-3">
          {TECH_STACK.map(({ name, icon }) => (
            <Chip key={name} startContent={icon} variant="bordered" size="lg">
              {name}
            </Chip>
          ))}
        </div>
      </section>

      <Divider />

      {/* Community & Social */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Community & Social</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {SOCIAL_LINKS.map(({ name, description, href, icon, color }) => (
            <Card key={name} shadow="sm" isPressable as={Link} href={href} target="_blank">
              <CardBody className="flex flex-col items-center text-center gap-2 p-5">
                <div className="text-default-600">{icon}</div>
                <p className="font-semibold">{name}</p>
                <p className="text-default-500 text-xs">{description}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      <Divider />

      {/* Support & Contact */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Suporte & Contato</h2>
        <p className="text-default-500">
          Encontrou um bug? Tem uma sugestão? Quer contribuir? Adoraríamos ouvir de você.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            as={Link}
            href="https://wa.me/258834884185?text=cineplay%20support:"
            target="_blank"
            startContent={<FaWhatsapp />}
            variant="bordered"
          >
            WA-Support
          </Button>
          <Button
            as={Link}
            href="https://kaptech.site"
            target="_blank"
            startContent={<FaGlobe />}
            variant="bordered"
          >
            Or Website
          </Button>
          <Button
            as={Link}
            href="mailto:geral@kaptech.site"
            startContent={<FaEnvelope />}
            color="primary"
            variant="flat"
          >
            Send an Email
          </Button>
        </div>
      </section>

      <Divider />

      {/* Legal */}
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Legal</h2>
        <p className="text-default-500 leading-relaxed">
          O CINEPLAY está licenciado sob a licença{" "}
          <Link
            
            target="_blank"
            className="font-semibold"
          >
            CC BY-NC
          </Link>
          . Isso significa que você é livre para usar, modificar e distribuir o projeto desde que inclua a notificação original de direitos autorais.
        </p>
        <p className="text-default-500 leading-relaxed">
          Todos os dados sobre filmes e programas de TV são fornecidos pela{" "}
          <Link /*href="https://www.themoviedb.org/"*/ target="_blank" className="font-semibold">
            TMDB
          </Link>
          . Não reivindicamos a propriedade de nenhum conteúdo exibido nesta plataforma.
        </p>
      </section>

    </div>
  );
};

export default AboutPage;