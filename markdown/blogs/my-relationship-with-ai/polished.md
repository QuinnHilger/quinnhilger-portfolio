# My Relationship with AI

## The Strange Timing of It All

I graduated from college eight months ago with a degree in computer science. A month later, I started my first job as a software engineer. This is a peculiar moment to enter the field.

I'll preface with this: no one truly understands how their degree translates to actual work before living it. Even grasping the day-to-day reality of a job is difficult from the outside. Computer science is probably one of the easier degrees to project onto a career path. But the version of software engineering I studied for four years bears little resemblance to the version I'm practicing today. And here's the unsettling part: what this career looks like in the future feels genuinely unknowable. The workflows, the skills that command value, the job titles themselves, the profiles of engineers who thrive. Trying to predict any of these even one year out feels futile. Extend that to five or ten years and you're just guessing. Maybe this has always been true in a field where technology compounds so rapidly. But the step change that occurred during my time in school feels unprecedented.

## AI in College

ChatGPT arrived at the end of my first quarter sophomore year. By the time I returned from winter break, it was clear that knowledge work had been knocked onto a new trajectory.

The early applications felt modest. I used it for answering trivial questions, slowly replacing Google search, performing grunt translations of thoughts into text or code. Then, over time, referencing ChatGPT started feeling more useful than diving into Stack Overflow. Brainstorming and planning migrated from messy Google Docs to a chat interface. As I developed an intuition for how to leverage an LLM, and as the models grew more capable at producing useful probability distributions of the next token in a sequence, AI's presence solidified as a partner for all knowledge work.

I'll also take this moment to give myself some credit. I remained fairly skeptical about AI's impact on my learning. On one hand, I genuinely hated the idea of cheating. When projects and assignments were explicitly AI-free, I adhered to that and produced my work independently. Even on projects outside of coursework, I preferred to operate with minimal AI involvement. While building SpotMe, a workout app in React Native, I mostly used AI as a syntax dictionary. I understood the systems I wanted to implement and how to organize the components. But when filling in CSS or recalling a method signature, AI could handle that quickly. What I absolutely refused to do was copy and paste an entire file, component, or non-trivial function into my codebase. That felt beneath me. I wanted to learn. I had confidence in my ability to produce a better product. I carried a chip on my shoulder about generating my own work, formulating my own ideas, problem solving and implementing by myself.

I'd work on school projects with a team and watch a classmate open a PR with lines we've all seen before...

```typescript
  if (existingPlayer) {
    throw new Error("User is already a member of this league"); // ✅ Prevent duplicate join/request
  }

 return data.map((entry) => {
    const league = Array.isArray(entry.leagues)
      ? entry.leagues[0]
      : entry.leagues; // 🔹 Ensure it's an object
```

I personally forgot the keyboard shortcut to include emojis while typing, so I could never pull off the beauty that is emojis in code comments. In hindsight, copy-pasting some trivial validation from ChatGPT was probably the most efficient move. Given that this code was low-risk, it was fine for our project. But my initial reaction was not nearly as generous. I perceived copied AI code as sloppy and lazy.

That was my general sentiment toward the end of college. And honestly, I believe that perspective served me well. I was able to maximize my opportunities to learn while in school. I'm a better thinker and problem solver because of it.

## New Perspectives

The expectation and incentive structure shifts once you leave school. Growing and learning still matter. Selfishly, they're crucial for positioning yourself as a valuable employee and setting yourself up for the future. For the company, they benefit from leadership and seniors maturing into their roles within the org. But the primary driving force in the real world is efficiency and quality of output. The faster you can produce better work, the better it is for the company.

This incentive structure leans heavily into utilizing tooling assistants. I'm fortunate that my employer actively encourages adopting AI into daily workflows. We have near-unlimited access to the newest tools and models (provided they pass some security process). Engineers across the org share experiences, tips, tricks, and projects. It's honestly a wonderful environment to learn how to utilize AI and grow as a problem solver.

I'm also lucky that all of this is accelerating just as I begin my career. AI seems to be shifting from a tool to a paradigm. When you ask people outside of software engineering if they use AI at work, their answers often revolve around whether they prefer Google or ChatGPT. I'll hear some people describe the "life-changing AI" they use, which rewrites their emails in a friendlier tone. That is not the world of AI I'm referencing.

The AI tools in software development have evolved far beyond syntax dictionaries or intelligent autocomplete. AI researcher and software developer Andrej Karpathy has described the LLM capabilities of Claude and Codex around December 2025 as a phase shift in software engineering. This leap in capability, combined with the fact that software engineering seems uniquely positioned to harness this growth, plus an employer encouraging and supplying advanced AI tooling... it all feels like I've been handed the instruments to build myself a successful and impactful career. I could create meaningful work while still providing for my family. There's just one problem: these tools didn't come with an instruction manual.

## My Attempts

Having no instructions is totally fine, though. All of the Amazon and Wayfair furniture sitting in my apartment was assembled on a very instruction-optional basis. Find a hole and a screw that fits, keep putting pieces together. This worked pretty well, and most of the furniture would still survive a 4.0 magnitude earthquake.

My approach to this age of AI isn't far off. First, I'm trying to stay informed. I read my daily tech newsletter TLDR, I've picked up software-related podcasts like "The Pragmatic Engineer" and "The AI Daily Brief." I share ideas and participate in AI-related discussions at the office. I ingest all of these thoughts, letting them permeate while going on a run or walking to work, hoping to refine my utilization of these tools.

At work, my primary tool for the last few months has been the CLI coding assistant Claude Code. Between Claude Code and Codex, it's clearly a differentiated product from the alternatives. But picking a tool is just the start. Then you have to figure out how to use it.

So how do you learn to use these tools effectively? My answer is simple: just use them. Over the past two months, I've reached #1 on the Claude Code usage leaderboard for my vertical (roughly 80 engineers). I'm hoping this is viewed positively as ambitious and curious rather than expensive. Though "just using it" is definitely oversimplifying. Using it without the right intent or analysis is stepping down the wrong path. It requires an open mind while remaining critical and preference-oriented. I need to ask the right questions and come up with my own answers.

In which contexts should I lean into the AI tools? Currently they're most helpful for documentation aggregation, code review, code implementation, and codebase-related incident investigations.

What configurations should I use? I like having both user-level and repo-level claude.md files to define rules, add context, and set coding preferences. I iterate on these rather than attempting to produce some perfect document on my first try.

What tools should I give the agent? Honestly, I think MCPs are extremely overrated. They're rarely implemented well, they clog up context windows, slow down response times, and incorporate bad, uncontrolled context. I prefer setting up skills and agents that reference local markdown files (that I have Claude create) and allowing these to be invoked during use.

How do I harness the agent? I like the idea of isolating Claude in a dangerously-skip-perms virtual container, though I haven't executed that yet. Currently I just iterate on allowed permissions (mostly all read permissions and in-repo file edit access). I include which commands to run in config files to prevent it from requesting tools that require my manual approval.

## The Hopeful Future

Wow, looks like I've figured it all out. Easy, done. Right? Obviously not.

Not only are my current answers far from some optimized set of environment controls, but the optimized set will be constantly changing. Model capabilities, access to tools, even the demands placed on a software engineer are all set to shift dramatically. So beyond finding my own preferences for utilizing AI, I need to remain open-minded and ready to pivot.

This does feel scary. It sounds like a burden. But the opportunities these tools have unlocked are genuinely exciting. What I can create and accomplish as an engineer is far greater than I could have imagined before.

It's a thrilling time to be a software engineer. I entered this field because it felt like you could build so much so easily. You don't need thousands of study patients and decades of research to produce something amazing. You don't need large metal-cutting machines and 3D printers to bring ideas to life. Now AI has amplified what's possible by 5x, 20x, who knows. This is truly remarkable technology that will reshape the world, and I'm so excited to be immersed in that transformation.

Thanks for reading all of that yapping. Whether you're in the software field or not, I hope this was insightful and maybe a bit inspirational for thinking about and using AI. There's so much more that could be explored. And if you want a happy ending, feel free to stop here.

It's not all sunshine and rainbows.

## The Scary Future

I'll keep this part relatively brief since I'm neither a doomsday expert nor a dystopian novel author. There are certainly frightening futures out there regarding AI. Machines enslaving humans for energy while we live out our fantasies in goo-filled pods is not the future I'm referencing.

AI is going to seriously disrupt what it means to work across the globe. Yes, there have been significant technological shifts in the past that reshaped labor. That's pretty obvious if you're reading this on a computer or phone rather than out picking wild blueberries or hunting mammoths. This shift feels different, though. (I'm 23 years old, so I've experienced a whole lot of technological shifts, obviously.)

Selfishly, I think a lot about what software engineering will look like. How many software engineers will we have? What will their purpose be? My belief is that we'll see relatively solid job growth as a field. Maybe each engineering team will have fewer developers than they do currently. But I believe software engineers can absorb nearly any other knowledge work role. If AI becomes good enough to reduce the need for engineers because it writes code so effortlessly, then any smart engineer equipped with that AI can construct agents, models, automations, whatever you want to call them, to make other knowledge work careers obsolete too.

The impact will extend far beyond a single profession. All of the work currently done by humans will be automated and optimized to require fewer and fewer humans. Hopefully we can generate new work to do just as fast. But that's a hope. Not a guarantee. I do expect some tough times ahead for my generation. Jobs won't be guaranteed. Futures will be harder to predict than ever. Plans for buying homes or having kids may get delayed. The probability of difficult times for millions of people due to AI reducing employment seems to be converging on certainty.

As a species, we may become so productive that we run out of things we need to do. The feeling of purpose and providing that fuels everyone waking up each day may start to fade. Something that sounds objectively good, productivity, may trigger a downfall for society.

## I'd Rather Be Optimistic

But where's the fun in that perspective? Being a pessimist counting down the days until the end of the world doesn't sound like an approach to life I'd prefer.

So instead I'll maintain my hope. I believe humans are special little meat sacks capable of amazing things. If these amazing things lead to automating away the production of all necessities, freeing humans to satisfy themselves in more grand ways, I'm all for it. Maybe we start singing and dancing more. Maybe we explore nature that we've successfully saved from climate change through products of AI. I'm not sure what the specifics look like, but I definitely have hope that we'll figure it out.

Best of luck to the doomsday preppers. I'll be betting my money on the intellectually advanced apes figuring it out and thriving in whatever new world emerges from the AI revolution.
