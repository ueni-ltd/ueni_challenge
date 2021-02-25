# UENI Coding Challenge

## User Story

(Expected required time is 45-90 minutes)

The repository contains an application fully developed in accordance with the following description.
You can see the result [here](https://ueni-ltd.github.io/ueni_challenge/).
Some interesting parts or layers were removed from the source code, and the goal of this challenge is to implement them again.
Don't get limited by the existing code. Feel free to adjust, rewrite, optimize or to delete whatever you need.
Overengineering is welcome if you want to show your skills.

1. The application fetches a .json file that contains events defined by start, end, id and name. The list is already sorted by “start” field.
2. We want to render these events on a scrollable timeline in any ratio.
3. On the timeline there is another component that demonstrates a selected interval. The element will go green if it does not overlap with any event or turn red otherwise.
4. There are two ways to change the selected interval. Either by clicking on the timeline (duration is reused) or by Start and End input fields.
5. There will also be another field that allows events to be filtered out based on the name.

### You will need to implement

- design and implement global state management (preferably but not necessarily React Context)
- render **Events** components to the **TimeLine** element in the root **App** component
- **TimeLine** and **SelectedTime** components need to access and to mutate the global state somehow
- implement **useControlsBar** hook according to its interface
- /src/utils/index.ts contains **_isIntervalFree_** function. Implement the algorithm
- style the **Event** component so that its centered vertically within TimeLine and so that its inner content is centered vertically and horizontally

Please fork the repository to your private github and provide us with a link a to it. Alternatively use codesandbox or similar.
Having you open PR directly would disclose solutions.

## Development Notes

- Features
  - State management
- The entire app state is managed in a single shape, due to ensure a proper level of performance.
- The `Loader` component has been included in rendering in order to properly manage the fetching action and possible fetching errors too
- The helper `getActiveEvents` getter in _/src/utils/index.ts_ has been implemented to manage filtered events and render them at startup and during other selective actions
- The ambient declaration `Dashboard.d.ts` has been implemented to introduce different types and interfaces for common use

More details are indicated inside the code comments - where needed. For any further in-depth consideration, please contact me on info@lucacattide.dev or feel free to open an issue.
