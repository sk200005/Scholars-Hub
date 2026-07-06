# COMPONENT RULES

Whenever recreating a component from

21st.dev

ReactBits

or any other source

DO NOT simplify.

Your objective is to reproduce the original behaviour as accurately as possible.

Before generating code

Analyze

Animation timing

Easing

Hover effects

Gradients

Spacing

Responsive layout

Blur

Opacity

Transforms

Motion curves

Transitions

Pointer interactions

Scroll interactions

Then list

All npm packages

All dependencies

All hooks

All CSS variables

All utilities

All global styles

All required providers

Only after analysis

generate production-ready code.

Never approximate animations.

Never replace complex effects with simplified versions.

When integrating into the project

Replace ONLY

Colors

Typography

Spacing

Buttons

Icons

using the existing Design System.

Preserve original functionality.

Layout Rules

Every section must be wrapped in

<Section>

    <Container>

        Content

    </Container>

</Section>

Copied templates must NOT define their own page container.

Remove

max-width

container

page wrapper

horizontal padding

if already provided by the project.

The project's Container component is the single source of truth.