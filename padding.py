import re

def update_px(file_name):
    with open(file_name, "r+") as f:
        old = f.read() # read everything in the file
        new_lines = []
        lines = old.split('\n')
        for line in lines:
            if 'px' in line:
                for (start, end) in [(m.start(0), m.end(0)) for m in re.finditer('(-| )[0-9]+px', line)]:
                    if 'px' in line[start:end]:
                        size_px = line[start:end - 2]
                    else:
                        size_px = line[start:end]
                    size_px = int(size_px.strip())
                    line = f'{line[:start]} {size_px / 8}rem{line[end:]}'
                    break
                    
            new_lines.append(line)
        # print('new_lines', '\n'.join(new_lines))
        f.seek(0)
        f.write('\n'.join(new_lines))


if __name__ == '__main__':
    arr = [
        './blocks/nominations/nominations.scss'
        # './blocks/capabilities/capabilities.scss',
        # './blocks/faq/faq.scss',
        # './blocks/footer/footer.scss',
        # './blocks/header/header.scss',
        # './blocks/mentors/mentors.scss',
        # './blocks/organizers/organizers.scss',
        # './blocks/participation/participation.scss',
        # './blocks/partners/partners.scss',
        # './blocks/programm/programm.scss',
        # './blocks/short-about/short-about.scss',
        # './blocks/timeline/timeline.scss',
        # './blocks/style.scss',
        # './blocks/common/common.scss',
        # './blocks/about/about.scss'
    ]
    for el in arr:
        update_px(el)