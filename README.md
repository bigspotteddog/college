# Good Reads

https://college.harvard.edu/admissions/preparing-college/should-i-take-time
https://college.harvard.edu/admissions/apply/what-we-look/valuing-creative-reflective
http://thechoice.blogs.nytimes.com/2009/09/10/harvarddean-part1

Here are the commands used to pull these pages:

    wget \
    -e robots=off \
    --span-hosts \
    --no-clobber \
    --page-requisites \
    --html-extension \
    --convert-links \
    --restrict-file-names=windows \
    --domains harvard.edu \
    http://thechoice.blogs.nytimes.com/2009/09/10/harvarddean-part1
    
    
    wget \
    --adjust-extension \
    --span-hosts \
    --convert-links \
    --backup-converted \
    --page-requisites http://thechoice.blogs.nytimes.com/2009/09/10/harvarddean-part1
