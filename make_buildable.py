import os
import sys
import subprocess
import sys
import shutil


def move_directory_contents(src_dir, dest_dir):

    shutil.rmtree(dest_dir)

    for item in os.listdir(src_dir):
        src_item = os.path.join(src_dir, item)
        dest_item = os.path.join(dest_dir, item)
        shutil.move(src_item, dest_item)


def get_project_name(dir_path, fname):
    parts = dir_path.split('/')[1:]
    return '-'.join(parts + [fname])


def make_project_buildable(dir_path, project_name, name, build_module):
    print(f'making {project_name} buildable...')

    new_name = f'{name}-new'
    normalized_dir_path = dir_path.replace('libs/', '')

    print('creating new project')
    new_cmd = f'nx g {build_module}:lib --directory {normalized_dir_path} {new_name} --buildable'
    subprocess.run(new_cmd.split(' '), check=True)

    print('replacing files from old in new')
    old_src = os.path.join(dir_path, name, 'src')
    new_src = os.path.join(dir_path, new_name, 'src')
    move_directory_contents(old_src, new_src)

    print('deleting old project')
    rm_cmd = f'nx g @nrwl/workspace:rm --projectName {project_name} --forceRemove'
    subprocess.run(rm_cmd.split(' '), check=True)


def main(dir_path, build_module):

    for fname in os.listdir(dir_path):
        project_name = get_project_name(dir_path, fname)
        make_project_buildable(dir_path, project_name, fname, build_module)
        break


if __name__ == '__main__':
    dir_path, build_module = sys.argv[1:]
    main(dir_path, build_module)
