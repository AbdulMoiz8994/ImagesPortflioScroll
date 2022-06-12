import { Badge, Icon } from '@chakra-ui/react'
import * as React from 'react'
import { 
  FaFacebook, 
  FaInstagram, 
  FaLinkedin, 
  FaTwitter, 
  FaPhoneAlt, 
  FaSpotify, 
  FaYoutube, 
  FaPinterest, 
  FaCcVisa,
  FaCcMastercard,
  FaCcStripe,
  FaApplePay
} from 'react-icons/fa';
import { SiAmericanexpress, SiGooglepay } from 'react-icons/si'
import { AiOutlineMail } from 'react-icons/ai';

export interface LinkGroupData {
  title: string
  links: Array<{
    label: string
    href: string
    badge?: React.ReactElement,
    icon?: React.ReactElement
  }>
}

export const links: LinkGroupData[] = [
  {
    title: 'Social',
    links: [
      { label: 'Instagram', href: '/', icon: <Icon as={FaInstagram} /> },
      { label: 'Twitter', href: '/', icon: <Icon as={FaTwitter} /> },
      {label: 'Facebook', href: '/', icon: <Icon as={FaFacebook} /> },
      {label: 'Youtube', href: '/', icon: <Icon as={FaYoutube} /> },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'Contact Us', href: '/' },
      { label: 'yourexample@email.com', href: '/' },
      { label: 'example@email.com', href: '/' },
      { label: 'Call us: +1 254 568 5479', href: '/' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'Support Center', href: '/' },
      { label: 'Customer Support', href: '/' },
      { label: 'About Us', href: '/' },
      { label: 'Copyright', href: '/' },
    ],
  },
  {
    title: 'Customer Care',
    links: [
      { label: 'FAQ & Helps', href: '/' },
      { label: 'Shipping & Delivery', href: '/' },
      { label: 'Return & Exhanges', href: '/' },
    ],
  },
]

interface SocialLink {
  label: string
  icon: React.ReactElement
  href: string
}

export const socialLinks: SocialLink[] = [
  { label: 'Facebook', icon: <FaFacebook />, href: '#' },
  { label: 'Instagram', icon: <FaInstagram />, href: '#' },
  { label: 'LinkedIn', icon: <FaLinkedin />, href: '#' },
  { label: 'Twitter', icon: <FaTwitter />, href: '#' },
  { label: 'Spotify', icon: <FaSpotify />, href: '#' },
  { label: 'Youtube', icon: <FaYoutube />, href: '#' },
  { label: 'Pinterest', icon: <FaPinterest />, href: '#' },
]

interface PaymentLink {
  label: string
  icon: React.ReactElement
  href: string
}

export const paymentsLinks: PaymentLink[] = [
  { label: "Visa", icon: <FaCcVisa size="35" />, href: "#" },
  { label: "MasterCard", icon: <FaCcMastercard size="35" />, href: "#" },
  { label: "AmericanExpress", icon: <SiAmericanexpress size="28" height="10" />, href: "#" },
  { label: "Stripe", icon: <FaCcStripe size="35" />, href: "#" },
  { label: "ApplePay", icon: <FaApplePay size="35" />, href: "#" },
  { label: "GooglePay", icon: <SiGooglepay size="35" />, href: "#" },
]

interface FooterLink {
  label: string
  href: string
}

export const footerLinks: FooterLink[] = [
  { label: 'Terms of Service', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Offer terms', href: '#' },
  { label: 'Legal notice', href: '#' },
  { label: 'Sitemap', href: '#' },
]
