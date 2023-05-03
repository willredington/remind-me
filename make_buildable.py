import os
import sys
import subprocess
import sys


def get_project_name(dir_path, fname):
    parts = dir_path.split('/')[1:]
    return '-'.join(parts + [fname])


def make_project_buildable(dir_path, project_name, name, build_module):
    print(f'making {project_name} buildable...')
    normalized_dir_path = dir_path.replace('libs/', '')

    print('creating new project')
    new_cmd = f'nx g {build_module}:lib --directory {normalized_dir_path} {name}-new --buildable'
    subprocess.run(new_cmd.split(' '), check=True)

    print('moving old project')
    mv_cmd = f'nx g @nrwl/workspace:mv --projectName {project_name} {name}-new'
    subprocess.run(mv_cmd.split(' '), check=True)


def main(dir_path, build_module):

    for fname in os.listdir(dir_path):
        project_name = get_project_name(dir_path, fname)
        make_project_buildable(dir_path, project_name, fname, build_module)
        break


if __name__ == '__main__':
    dir_path, build_module = sys.argv[1:]
    main(dir_path, build_module)
