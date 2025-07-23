

import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Calendar, User, ArrowLeft, Share2, BookOpen } from "lucide-react";


const blogPosts = [
  {
    id: 1,
    title: "The Benefits of Natural Health Supplements",
    excerpt:
      "Discover how natural supplements can improve your overall health and wellness",
    content: `
      <p>Natural health supplements have become increasingly popular as people seek alternative ways to maintain and improve their health. Unlike synthetic supplements, natural supplements are derived from whole foods, herbs, and other natural sources, making them more bioavailable and easier for the body to absorb.</p>
      
      <h2>Why Choose Natural Supplements?</h2>
      <p>Natural supplements offer several advantages over their synthetic counterparts:</p>
      <ul>
        <li><strong>Better Absorption:</strong> Your body recognizes natural forms of vitamins and minerals more easily, leading to improved absorption and utilization.</li>
        <li><strong>Fewer Side Effects:</strong> Natural supplements typically have fewer adverse reactions and are gentler on your digestive system.</li>
        <li><strong>Synergistic Effects:</strong> Natural supplements often contain complementary compounds that work together to enhance effectiveness.</li>
        <li><strong>Sustainable and Eco-friendly:</strong> Many natural supplements are produced using sustainable farming practices.</li>
      </ul>
      
      <h2>Key Natural Supplements to Consider</h2>
      <p>Here are some of the most beneficial natural supplements that can support your health journey:</p>
      
      <h3>1. Omega-3 Fatty Acids</h3>
      <p>Found in fish oil, flaxseed, and chia seeds, omega-3s support heart health, brain function, and reduce inflammation throughout the body.</p>
      
      <h3>2. Probiotics</h3>
      <p>These beneficial bacteria support digestive health, immune function, and may even influence mood and mental health.</p>
      
      <h3>3. Vitamin D3</h3>
      <p>Essential for bone health, immune function, and mood regulation. Natural vitamin D3 is more effective than synthetic D2.</p>
      
      <h3>4. Turmeric/Curcumin</h3>
      <p>A powerful anti-inflammatory compound that supports joint health and may help reduce the risk of chronic diseases.</p>
      
      <h2>How to Choose Quality Natural Supplements</h2>
      <p>When selecting natural supplements, consider these important factors:</p>
      <ul>
        <li>Look for third-party testing and certifications</li>
        <li>Choose reputable brands with transparent sourcing</li>
        <li>Check for organic and non-GMO certifications</li>
        <li>Read ingredient labels carefully</li>
        <li>Consult with healthcare professionals before starting any new supplement regimen</li>
      </ul>
      
      <h2>The Importance of a Holistic Approach</h2>
      <p>While natural supplements can provide valuable support for your health, they work best as part of a comprehensive wellness strategy that includes:</p>
      <ul>
        <li>A balanced, nutrient-rich diet</li>
        <li>Regular physical activity</li>
        <li>Adequate sleep and stress management</li>
        <li>Regular health check-ups</li>
      </ul>
      
      <p>Remember, supplements are meant to supplement, not replace, a healthy lifestyle. By combining natural supplements with good nutrition and lifestyle habits, you can create a powerful foundation for optimal health and wellness.</p>
    `,
    author: "Dr. Sarah Johnson",
    date: "Dec 15, 2024",
    readTime: "8 min read",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/ab9739dd748e18cb32e34f0e0ee9be1a6b5adf13?width=794",
    slug: "benefits-natural-health-supplements",
    category: "Supplements",
    tags: ["supplements", "natural health", "wellness", "nutrition"],
  },
  {
    id: 2,
    title: "Essential Oils for Daily Wellness",
    excerpt: "Learn how to incorporate essential oils into your daily routine",
    content: `
      <p>Essential oils have been used for centuries to promote physical and emotional well-being. These concentrated plant extracts offer a natural way to enhance your daily wellness routine and create a more balanced, healthier lifestyle.</p>
      
      <h2>What Are Essential Oils?</h2>
      <p>Essential oils are volatile aromatic compounds extracted from plants through various methods such as steam distillation, cold pressing, or CO2 extraction. These oils capture the plant's scent, flavor, and beneficial properties in a highly concentrated form.</p>
      
      <h2>Top Essential Oils for Daily Use</h2>
      
      <h3>1. Lavender Oil</h3>
      <p>Known for its calming and relaxing properties, lavender oil is perfect for:</p>
      <ul>
        <li>Promoting restful sleep</li>
        <li>Reducing stress and anxiety</li>
        <li>Soothing minor skin irritations</li>
        <li>Creating a peaceful atmosphere</li>
      </ul>
      
      <h3>2. Peppermint Oil</h3>
      <p>This invigorating oil offers numerous benefits:</p>
      <ul>
        <li>Boosting mental clarity and focus</li>
        <li>Relieving headaches and tension</li>
        <li>Supporting digestive health</li>
        <li>Providing natural energy</li>
      </ul>
      
      <h3>3. Tea Tree Oil</h3>
      <p>A powerful antimicrobial oil that's excellent for:</p>
      <ul>
        <li>Supporting skin health</li>
        <li>Natural cleaning solutions</li>
        <li>Immune system support</li>
        <li>Purifying the air</li>
      </ul>
      
      <h2>How to Use Essential Oils Safely</h2>
      <p>While essential oils are natural, they're potent and should be used with care:</p>
      <ul>
        <li><strong>Dilute properly:</strong> Always dilute essential oils with a carrier oil before topical application</li>
        <li><strong>Patch test:</strong> Test new oils on a small skin area first</li>
        <li><strong>Quality matters:</strong> Choose pure, therapeutic-grade oils from reputable sources</li>
        <li><strong>Storage:</strong> Keep oils in dark glass bottles away from heat and light</li>
        <li><strong>Pregnancy and children:</strong> Consult healthcare providers before use</li>
      </ul>
      
      <h2>Daily Essential Oil Routine</h2>
      <p>Here's a simple routine to incorporate essential oils into your day:</p>
      
      <h3>Morning</h3>
      <ul>
        <li>Add 2-3 drops of peppermint oil to your diffuser for energy and focus</li>
        <li>Mix 1 drop of lemon oil in your water for a refreshing start</li>
      </ul>
      
      <h3>Afternoon</h3>
      <ul>
        <li>Apply diluted eucalyptus oil to your temples for mental clarity</li>
        <li>Use tea tree oil in your cleaning routine</li>
      </ul>
      
      <h3>Evening</h3>
      <ul>
        <li>Diffuse lavender oil 30 minutes before bedtime</li>
        <li>Add a few drops of chamomile oil to your bath</li>
      </ul>
      
      <p>Essential oils offer a natural, effective way to support your wellness journey. Start slowly, pay attention to how your body responds, and enjoy discovering which oils work best for your unique needs.</p>
    `,
    author: "Maria Rodriguez",
    date: "Dec 12, 2024",
    readTime: "6 min read",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/530126735eb9935a222ccdad870af49e50a60b9d?width=794",
    slug: "essential-oils-daily-wellness",
    category: "Wellness",
    tags: [
      "essential oils",
      "aromatherapy",
      "natural wellness",
      "daily routine",
    ],
  },
  {
    id: 3,
    title: "Natural Remedies for Joint Pain",
    excerpt:
      "Effective natural solutions for managing joint pain and inflammation",
    content: `
      <p>Joint pain affects millions of people worldwide, whether due to aging, injury, or chronic conditions like arthritis. While conventional treatments have their place, many people are turning to natural remedies that can provide relief without the side effects often associated with pharmaceutical options.</p>
      
      <h2>Understanding Joint Pain</h2>
      <p>Joint pain can result from various factors including:</p>
      <ul>
        <li>Inflammation</li>
        <li>Cartilage deterioration</li>
        <li>Muscle tension</li>
        <li>Poor circulation</li>
        <li>Nutritional deficiencies</li>
      </ul>
      
      <h2>Top Natural Remedies for Joint Pain</h2>
      
      <h3>1. Turmeric and Curcumin</h3>
      <p>Turmeric contains curcumin, a powerful anti-inflammatory compound that can help reduce joint pain and stiffness. Studies show that curcumin may be as effective as some anti-inflammatory medications.</p>
      <p><strong>How to use:</strong> Take 500-1000mg of curcumin extract daily, or add fresh turmeric to your cooking.</p>
      
      <h3>2. Omega-3 Fatty Acids</h3>
      <p>These essential fats help reduce inflammation throughout the body, including in the joints. They're particularly beneficial for rheumatoid arthritis sufferers.</p>
      <p><strong>Sources:</strong> Fatty fish, fish oil supplements, flaxseeds, chia seeds, and walnuts.</p>
      
      <h3>3. Ginger</h3>
      <p>Ginger contains compounds that can help reduce inflammation and pain. It's been used for centuries in traditional medicine for joint and muscle pain.</p>
      <p><strong>How to use:</strong> Fresh ginger tea, ginger extract supplements, or topical ginger preparations.</p>
      
      <h3>4. Boswellia</h3>
      <p>Also known as Indian frankincense, boswellia has been shown to reduce inflammation and may help prevent cartilage breakdown.</p>
      
      <h3>5. Cherry Extract</h3>
      <p>Tart cherries are rich in anthocyanins, which have anti-inflammatory properties. Studies suggest they may help reduce pain and inflammation in arthritis patients.</p>
      
      <h2>Lifestyle Approaches for Joint Health</h2>
      
      <h3>Exercise and Movement</h3>
      <p>Regular, gentle exercise is crucial for joint health:</p>
      <ul>
        <li><strong>Low-impact activities:</strong> Swimming, cycling, walking</li>
        <li><strong>Strength training:</strong> Builds muscle to support joints</li>
        <li><strong>Flexibility work:</strong> Yoga, stretching, tai chi</li>
        <li><strong>Balance exercises:</strong> Prevent falls and joint injury</li>
      </ul>
      
      <h3>Diet and Nutrition</h3>
      <p>An anti-inflammatory diet can significantly impact joint health:</p>
      <ul>
        <li>Include plenty of colorful fruits and vegetables</li>
        <li>Choose lean proteins and omega-3 rich fish</li>
        <li>Limit processed foods and refined sugars</li>
        <li>Stay hydrated</li>
        <li>Consider eliminating potential trigger foods</li>
      </ul>
      
      <h3>Weight Management</h3>
      <p>Maintaining a healthy weight reduces stress on weight-bearing joints and can significantly decrease pain and slow progression of joint damage.</p>
      
      <h2>Topical Natural Remedies</h2>
      
      <h3>Hot and Cold Therapy</h3>
      <ul>
        <li><strong>Heat:</strong> Relaxes muscles and increases circulation</li>
        <li><strong>Cold:</strong> Reduces inflammation and numbs pain</li>
      </ul>
      
      <h3>Essential Oil Blends</h3>
      <p>Topical application of diluted essential oils like wintergreen, eucalyptus, and peppermint can provide localized pain relief.</p>
      
      <h3>Epsom Salt Baths</h3>
      <p>Rich in magnesium, Epsom salt baths can help reduce inflammation and muscle tension around joints.</p>
      
      <h2>When to Seek Professional Help</h2>
      <p>While natural remedies can be highly effective, it's important to consult with healthcare professionals, especially if you experience:</p>
      <ul>
        <li>Severe or persistent pain</li>
        <li>Joint deformity or instability</li>
        <li>Signs of infection</li>
        <li>Significant impact on daily activities</li>
      </ul>
      
      <p>Natural remedies for joint pain offer a gentle, effective approach to managing discomfort and supporting overall joint health. By combining these natural solutions with healthy lifestyle choices, many people find significant relief and improved quality of life.</p>
    `,
    author: "Dr. Michael Chen",
    date: "Dec 10, 2024",
    readTime: "10 min read",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/32c3807e9cb359070eab9955b8d3424afce5a252?width=794",
    slug: "natural-remedies-joint-pain",
    category: "Natural Medicine",
    tags: ["joint pain", "natural remedies", "inflammation", "arthritis"],
  },
];

// More blog posts for related articles
const relatedPosts = [
  {
    id: 4,
    title: "The Power of Herbal Medicine",
    excerpt: "Understanding the traditional and modern uses of herbal medicine",
    author: "Dr. Emily Wilson",
    date: "Dec 8, 2024",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/890ca25cb45abe82c6b7e208abff0926b69b0ef1?width=794",
    slug: "power-herbal-medicine",
  },
  {
    id: 5,
    title: "Nutrition and Natural Health",
    excerpt: "How proper nutrition supports your natural health journey",
    author: "Nutritionist Lisa Brown",
    date: "Dec 5, 2024",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/23b15a9a79d7dc3d18ceb94301ccc2f1db8c3f54?width=794",
    slug: "nutrition-natural-health",
  },
  {
    id: 6,
    title: "Building a Natural Medicine Cabinet",
    excerpt: "Essential natural remedies every household should have",
    author: "Dr. James Thompson",
    date: "Dec 1, 2024",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/882182d6d9cd3bec2bd5ebe5fefa879042565b0f?width=794",
    slug: "building-natural-medicine-cabinet",
  },
];


export default function singleBlog({ params }) {
  const post = blogPosts.find((post) => post.slug === params.slug);
  if (!post) return notFound();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <div className="mb-6">
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                {post.category}
              </span>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {post.date}
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                {post.readTime}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              {post.title}
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              {post.excerpt}
            </p>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-96 object-cover rounded-xl shadow-lg"
          />
        </div>
      </section>

      <article className="py-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </article>

      <section className="py-8 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-600">Tags:</span>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-600">Share:</span>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Share2 className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Related Articles
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <article
                key={relatedPost.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-w-16 aspect-h-10">
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">
                    By {relatedPost.author} • {relatedPost.date}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {relatedPost.excerpt}
                  </p>
                  <Link
                    href={`/blog/${relatedPost.slug}`}
                    className="text-primary font-semibold hover:text-primary/80 transition-colors"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
