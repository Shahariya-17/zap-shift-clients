import React from "react";

const FAQ = () => {
  return (
    <section className="bg-gray-200 py-12">
      {" "}
      {/* Full section bg gray */}
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-center font-bold text-4xl">Frequently Asked Question (FAQ)</h1>
        <p className="text-center text-sm text-gray-400 m-4">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
        <div className="join join-vertical shadow-lg rounded-lg space-y-4">
          <div className="collapse collapse-arrow rounded-2xl border border-base-300 bg-base-100">
            <input type="radio" name="my-accordion-4" defaultChecked />
            <div className="collapse-title font-semibold">
              How does this posture corrector work?
            </div>
            <div className="collapse-content text-sm">
              A posture corrector works by providing support and gentle
              alignment to your shoulders, back, and spine, encouraging you to
              maintain proper posture throughout the day. Here’s how it
              typically functions: A posture corrector works by providing
              support and gentle alignment to your shoulders.
            </div>
          </div>

          <div className="collapse collapse-arrow rounded-2xl border border-base-300 bg-base-100">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title font-semibold">
              Is it suitable for all ages and body types?
            </div>
            <div className="collapse-content text-sm">
              No, suitability for a product, service, or activity depends
              entirely on what "it" refers to, as there is no universal answer
              for all ages and body types; you need to specify the item in
              question. However, knowing one's general body shape (e.g., apple,
              hourglass, pear) helps in choosing clothing that fits well and
              creating personalized wellness plans, but it is not a "life
              sentence" and should not be used to define health.
            </div>
          </div>

          <div className="collapse collapse-arrow rounded-2xl border border-base-300 bg-base-100">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title font-semibold">
              Does it really help with back pain and posture improvement?
            </div>
            <div className="collapse-content text-sm">
              Yes, improving your posture can significantly help with certain
              types of back pain by reducing strain on joints and muscles,
              improving circulation, and increasing energy. While not a cure-all
              for every condition, consistent, healthy posture can minimize the
              risk of developing back and neck pain and alleviate existing
              issues related to poor alignment. Incorporating regular exercises,
              being mindful of your sitting and standing habits, using
              supportive furniture, and sleeping on a firm mattress are key
              steps to achieving better posture and reduced pain.
            </div>
          </div>

          <div className="collapse collapse-arrow rounded-2xl border border-base-300 bg-base-100">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title font-semibold">
              Does it have smart features like vibration alerts?
            </div>
            <div className="collapse-content text-sm">
              Yes, a device with smart features often has vibration alerts for
              notifications and other alerts, as this is a common feature in
              smartphones, smartwatches, and even smart home sensors, though you
              may need to enable and customize them in the device's settings.
            </div>
          </div>

          <div className="collapse collapse-arrow rounded-2xl border border-base-300 bg-base-100">
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title font-semibold">
              How will I be notified when the product is back in stock?
            </div>
            <div className="collapse-content text-sm">
              You will likely be notified via email or SMS when a product you've
              shown interest in is back in stock, after signing up for a
              notification on the product's page. Automated systems on the
              retailer's website will detect the product's return and trigger
              the message to you directly. Some services also offer web push
              notifications or social media retargeting to alert interested
              shoppers.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;