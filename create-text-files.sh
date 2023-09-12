#!/bin/bash

data=("Foreword" "Introduction" "Getting the best from this book" "Worrying" "Looking on the bright side" "Body language" "Boundaries" "Eye contact" "Tone of voice" "Dress sense" "Distortions of the truth" "Misunderstandings other people might have about you" "Conversation" "General knowledge" "Names" "Humour and conflict" "Sexually related problems and points about going out" "Nights Out" "Chat ups" "Invitation" "Personal Security" "Rape Crisis" "Finding the right friends" "Keeping a clean slate" "Coming Clean" "Education" "Living Away from Home" "Using the Phone" "Guests" "Jobs and Interviews" "Driving" "Travelling abroad" "Bartering" "Opportunities" "A Personal in depth analysis of the problem" "Further Reading")

for item in "${data[@]}"
do
  # Convert the item to lowercase and replace spaces with hyphens
  filename=$(echo "$item" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g')
  
  # Create a txt file with the filename
  touch "assets/$filename.txt"
done
